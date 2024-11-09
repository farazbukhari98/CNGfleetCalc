// Constants
const CONSTANTS = {
    VEHICLE_COST: {
        LIGHT_DUTY: 15000,
        MEDIUM_DUTY: 15000,
        HEAVY_DUTY: 50000
    },
    ANNUAL_MILES: {
        LIGHT_DUTY: 15000,
        MEDIUM_DUTY: 20000,
        HEAVY_DUTY: 40000
    },
    BASE_MPG: {
        LIGHT_DUTY: 12,
        MEDIUM_DUTY: 10,
        HEAVY_DUTY: 5
    },
    CNG_LOSS: {
        LIGHT_DUTY: 0.05,
        MEDIUM_DUTY: 0.075,
        HEAVY_DUTY: 0.10
    },
    VEHICLE_LIFE: {
        LIGHT_DUTY: 10,
        MEDIUM_DUTY: 10,
        HEAVY_DUTY: 15
    },
    MAINTENANCE_COST: {
        GAS_CNG: 0.47,
        DIESEL: 0.52
    },
    BUSINESS_RATES: {
        AGLC: 0.18,  // 18.0% per year
        CGC: 0.192   // 19.2% per year
    },
    FAST_FILL_STATIONS: [
        { size: 1, capacity: 100, cost: 1828172 },
        { size: 2, capacity: 72001, cost: 2150219 },
        { size: 3, capacity: 192001, cost: 2694453 },
        { size: 4, capacity: 384001, cost: 2869245 },
        { size: 5, capacity: 576001, cost: 3080351 }
    ],
    TIME_FILL_STATIONS: [
        { size: 6, capacity: 100, cost: 491333 },
        { size: 1, capacity: 12961, cost: 1831219 },
        { size: 2, capacity: 108001, cost: 2218147 },
        { size: 3, capacity: 288001, cost: 2907603 },
        { size: 4, capacity: 576001, cost: 3200857 },
        { size: 5, capacity: 864001, cost: 3506651 }
    ]
};

// Matrix State
let matrixState = {
    lightDuty: Array(15).fill(0),
    mediumDuty: Array(15).fill(0),
    heavyDuty: Array(15).fill(0),
    totals: {
        lightDuty: 0,
        mediumDuty: 0,
        heavyDuty: 0
    },
    cumulativeFleet: {
        lightDuty: Array(15).fill(0),
        mediumDuty: Array(15).fill(0),
        heavyDuty: Array(15).fill(0)
    }
};

// Utility Functions
function calculateCNGMPG(baseMPG, lossFactor) {
    return baseMPG * (1 - lossFactor);
}

function calculateAnnualGGE(vehicleType, count) {
    const cngMPG = calculateCNGMPG(
        CONSTANTS.BASE_MPG[vehicleType],
        CONSTANTS.CNG_LOSS[vehicleType]
    );
    return (CONSTANTS.ANNUAL_MILES[vehicleType] * count) / cngMPG;
}

function formatCurrency(amount) {
    if (isNaN(amount) || amount === 0) return '$0';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Matrix Initialization and Update Functions
function initializeMatrix() {
    const table = document.querySelector('table');
    const headerRow = table.querySelector('thead tr');
    const matrixBody = document.getElementById('matrixBody');

    // Clear existing content
    while (headerRow.children.length > 1) {
        headerRow.removeChild(headerRow.lastChild);
    }
    matrixBody.innerHTML = '';

    // Add year columns
    for (let year = 1; year <= 15; year++) {
        const th = document.createElement('th');
        th.className = 'px-4 py-2 bg-gray-50 text-center';
        th.textContent = `Year ${year}`;
        headerRow.appendChild(th);
    }

    // Add vehicle type rows
    const vehicleTypes = ['Light Duty', 'Medium Duty', 'Heavy Duty'];
    vehicleTypes.forEach(type => {
        const row = document.createElement('tr');
        const typeCell = document.createElement('td');
        typeCell.className = 'px-4 py-2';
        typeCell.textContent = type;
        row.appendChild(typeCell);

        // Add year cells
        for (let year = 0; year < 15; year++) {
            const cell = document.createElement('td');
            cell.className = 'px-4 py-2 text-center';
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'matrix-input';
            input.value = '0';
            input.min = '0';
            input.disabled = true;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        matrixBody.appendChild(row);
    });
}

// Distribution Strategy Functions
function updateMatrixForDistributionStrategy() {
    const strategy = document.getElementById('distributionStrategy').value;
    const lightDuty = parseInt(document.getElementById('lightDutyVehicles').value) || 0;
    const mediumDuty = parseInt(document.getElementById('mediumDutyVehicles').value) || 0;
    const heavyDuty = parseInt(document.getElementById('heavyDutyVehicles').value) || 0;

    console.log('Vehicle counts:', { lightDuty, mediumDuty, heavyDuty });
    console.log('Selected strategy:', strategy);

    // Reset matrix state
    matrixState = {
        lightDuty: Array(15).fill(0),
        mediumDuty: Array(15).fill(0),
        heavyDuty: Array(15).fill(0),
        totals: {
            lightDuty,
            mediumDuty,
            heavyDuty
        },
        cumulativeFleet: {
            lightDuty: Array(15).fill(0),
            mediumDuty: Array(15).fill(0),
            heavyDuty: Array(15).fill(0)
        }
    };

    // Apply distribution strategy
    switch (strategy) {
        case 'immediate':
            matrixState.lightDuty[0] = lightDuty;
            matrixState.mediumDuty[0] = mediumDuty;
            matrixState.heavyDuty[0] = heavyDuty;
            break;

        case 'gradual5':
            ['lightDuty', 'mediumDuty', 'heavyDuty'].forEach(type => {
                const count = matrixState.totals[type];
                const yearlyAmount = Math.floor(count / 5);
                const remainder = count % 5;
                
                for (let i = 0; i < 5; i++) {
                    matrixState[type][i] = yearlyAmount + (i < remainder ? 1 : 0);
                }
            });
            break;

        case 'gradual10':
            ['lightDuty', 'mediumDuty', 'heavyDuty'].forEach(type => {
                const count = matrixState.totals[type];
                const yearlyAmount = Math.floor(count / 10);
                const remainder = count % 10;
                
                for (let i = 0; i < 10; i++) {
                    matrixState[type][i] = yearlyAmount + (i < remainder ? 1 : 0);
                }
            });
            break;

        case 'gradual15':
            ['lightDuty', 'mediumDuty', 'heavyDuty'].forEach(type => {
                const count = matrixState.totals[type];
                const yearlyAmount = Math.floor(count / 15);
                const remainder = count % 15;
                
                for (let i = 0; i < 15; i++) {
                    matrixState[type][i] = yearlyAmount + (i < remainder ? 1 : 0);
                }
            });
            break;

        case 'custom':
            enableMatrixInputs();
            return;
    }

    console.log('Updated matrix state:', matrixState);
    updateMatrixDisplay();
    calculateCumulativeFleets();
    updateInvestmentAnalysis();
}

function enableMatrixInputs() {
    const inputs = document.querySelectorAll('.matrix-input');
    inputs.forEach(input => {
        input.disabled = false;
        input.addEventListener('change', handleMatrixInputChange);
    });
}

function disableMatrixInputs() {
    const inputs = document.querySelectorAll('.matrix-input');
    inputs.forEach(input => {
        input.disabled = true;
        input.removeEventListener('change', handleMatrixInputChange);
    });
}

function handleMatrixInputChange(event) {
    const row = event.target.closest('tr');
    const rowIndex = Array.from(row.parentElement.children).indexOf(row);
    const colIndex = Array.from(event.target.closest('td').parentElement.children).indexOf(event.target.closest('td')) - 1;
    
    const vehicleTypes = ['lightDuty', 'mediumDuty', 'heavyDuty'];
    const vehicleType = vehicleTypes[rowIndex];
    
    const newValue = parseInt(event.target.value) || 0;
    matrixState[vehicleType][colIndex] = newValue;
    
    // Update totals
    matrixState.totals[vehicleType] = matrixState[vehicleType].reduce((sum, val) => sum + val, 0);
    
    // Validate against vehicle inputs
    const inputValue = parseInt(document.getElementById(`${vehicleType}Vehicles`).value) || 0;
    if (matrixState.totals[vehicleType] !== inputValue) {
        event.target.classList.add('input-error');
    } else {
        event.target.classList.remove('input-error');
    }

    calculateCumulativeFleets();
    updateInvestmentAnalysis();
}

function updateMatrixDisplay() {
    const vehicleTypes = ['lightDuty', 'mediumDuty', 'heavyDuty'];
    const rows = document.getElementById('matrixBody').children;

    vehicleTypes.forEach((type, rowIndex) => {
        const cells = rows[rowIndex].children;
        for (let year = 0; year < 15; year++) {
            const input = cells[year + 1].querySelector('input');
            input.value = matrixState[type][year];
        }
    });
}

function calculateCumulativeFleets() {
    console.log('Calculating cumulative fleets');
    const vehicleTypes = ['lightDuty', 'mediumDuty', 'heavyDuty'];
    
    vehicleTypes.forEach(type => {
        let cumulative = 0;
        matrixState.cumulativeFleet[type] = matrixState[type].map(count => {
            cumulative += count;
            return cumulative;
        });
    });
    
    console.log('Updated cumulative fleets:', matrixState.cumulativeFleet);
}

// Investment Analysis Functions
function updateInvestmentAnalysis() {
    console.log('Starting Investment Analysis Update');
    
    try {
        // Get input values
        const lightDuty = parseInt(document.getElementById('lightDutyVehicles').value) || 0;
        const mediumDuty = parseInt(document.getElementById('mediumDutyVehicles').value) || 0;
        const heavyDuty = parseInt(document.getElementById('heavyDutyVehicles').value) || 0;
        
        console.log('Vehicle counts:', { lightDuty, mediumDuty, heavyDuty });

        const prices = {
            gasoline: parseFloat(document.getElementById('gasolinePrice').value) || 3.38,
            diesel: parseFloat(document.getElementById('dieselPrice').value) || 3.84,
            cng: parseFloat(document.getElementById('cngRate').value) || 0.74
        };
        console.log('Prices:', prices);
        
        const stationType = document.getElementById('stationType').value;
        const businessType = document.getElementById('business').value;
        console.log('Station Type:', stationType);
        console.log('Business Type:', businessType);

        // Calculate vehicle investments
        const vehicleInvestments = {
            lightDuty: lightDuty * CONSTANTS.VEHICLE_COST.LIGHT_DUTY,
            mediumDuty: mediumDuty * CONSTANTS.VEHICLE_COST.MEDIUM_DUTY,
            heavyDuty: heavyDuty * CONSTANTS.VEHICLE_COST.HEAVY_DUTY
        };

        const totalVehicleInvestment = Object.values(vehicleInvestments).reduce((sum, val) => sum + val, 0);
        console.log('Vehicle investments:', vehicleInvestments);
        console.log('Total vehicle investment:', totalVehicleInvestment);

        // Calculate annual GGE
        const annualGGE = {
            lightDuty: calculateAnnualGGE('LIGHT_DUTY', lightDuty),
            mediumDuty: calculateAnnualGGE('MEDIUM_DUTY', mediumDuty),
            heavyDuty: calculateAnnualGGE('HEAVY_DUTY', heavyDuty)
        };

        const totalAnnualGGE = Object.values(annualGGE).reduce((sum, val) => sum + val, 0);
        console.log('Annual GGE by type:', annualGGE);
        console.log('Total annual GGE:', totalAnnualGGE);

        // Calculate station investment
        const stations = stationType === 'fastFill' ? 
            CONSTANTS.FAST_FILL_STATIONS : 
            CONSTANTS.TIME_FILL_STATIONS;
        
        let stationInvestment = 0;
        if (totalAnnualGGE > 0) {
            for (const station of stations) {
                if (station.capacity >= totalAnnualGGE) {
                    stationInvestment = station.cost;
                    break;
                }
            }
            if (stationInvestment === 0 && stations.length > 0) {
                stationInvestment = stations[stations.length - 1].cost;
            }
        }
        console.log('Station investment:', stationInvestment);

        // Calculate annual savings
        const businessRate = CONSTANTS.BUSINESS_RATES[businessType];
        let totalAnnualFuelSavings = 0;
        let totalAnnualMaintenanceSavings = 0;

        // Light Duty fuel savings
        if (lightDuty > 0) {
            const cngMPG = calculateCNGMPG(CONSTANTS.BASE_MPG.LIGHT_DUTY, CONSTANTS.CNG_LOSS.LIGHT_DUTY);
            const gasCost = (CONSTANTS.ANNUAL_MILES.LIGHT_DUTY / CONSTANTS.BASE_MPG.LIGHT_DUTY) * prices.gasoline;
            const cngCost = (CONSTANTS.ANNUAL_MILES.LIGHT_DUTY / cngMPG) * (prices.cng * (1 + businessRate));
            const fuelSavings = (gasCost - cngCost) * lightDuty;
            totalAnnualFuelSavings += fuelSavings;
            console.log('Light duty fuel savings:', fuelSavings);
        }

        // Medium Duty savings
        if (mediumDuty > 0) {
            const cngMPG = calculateCNGMPG(CONSTANTS.BASE_MPG.MEDIUM_DUTY, CONSTANTS.CNG_LOSS.MEDIUM_DUTY);
            const dieselCost = (CONSTANTS.ANNUAL_MILES.MEDIUM_DUTY / CONSTANTS.BASE_MPG.MEDIUM_DUTY) * prices.diesel;
            const cngCost = (CONSTANTS.ANNUAL_MILES.MEDIUM_DUTY / cngMPG) * (prices.cng * (1 + businessRate));
            const fuelSavings = (dieselCost - cngCost) * mediumDuty;
            totalAnnualFuelSavings += fuelSavings;
            console.log('Medium duty fuel savings:', fuelSavings);

            const maintSavings = mediumDuty * CONSTANTS.ANNUAL_MILES.MEDIUM_DUTY * 
                (CONSTANTS.MAINTENANCE_COST.DIESEL - CONSTANTS.MAINTENANCE_COST.GAS_CNG);
            totalAnnualMaintenanceSavings += maintSavings;
            console.log('Medium duty maintenance savings:', maintSavings);
        }

        // Heavy Duty savings
        if (heavyDuty > 0) {
            const cngMPG = calculateCNGMPG(CONSTANTS.BASE_MPG.HEAVY_DUTY, CONSTANTS.CNG_LOSS.HEAVY_DUTY);
            const dieselCost = (CONSTANTS.ANNUAL_MILES.HEAVY_DUTY / CONSTANTS.BASE_MPG.HEAVY_DUTY) * prices.diesel;
            const cngCost = (CONSTANTS.ANNUAL_MILES.HEAVY_DUTY / cngMPG) * (prices.cng * (1 + businessRate));
            const fuelSavings = (dieselCost - cngCost) * heavyDuty;
            totalAnnualFuelSavings += fuelSavings;
            console.log('Heavy duty fuel savings:', fuelSavings);

            const maintSavings = heavyDuty * CONSTANTS.ANNUAL_MILES.HEAVY_DUTY * 
                (CONSTANTS.MAINTENANCE_COST.DIESEL - CONSTANTS.MAINTENANCE_COST.GAS_CNG);
            totalAnnualMaintenanceSavings += maintSavings;
            console.log('Heavy duty maintenance savings:', maintSavings);
        }

        console.log('Total annual fuel savings:', totalAnnualFuelSavings);
        console.log('Total annual maintenance savings:', totalAnnualMaintenanceSavings);

        // Calculate final values
        const totalInvestment = totalVehicleInvestment + stationInvestment;
        const annualTotalSavings = totalAnnualFuelSavings + totalAnnualMaintenanceSavings;
        const paybackPeriod = annualTotalSavings > 0 ? totalInvestment / annualTotalSavings : 0;
        const netTotal = (annualTotalSavings * 15) - totalInvestment;

        console.log('Final calculations:', {
            totalInvestment,
            annualTotalSavings,
            paybackPeriod,
            netTotal
        });

        // Update display
        document.getElementById('vehicleInvestment').textContent = formatCurrency(totalVehicleInvestment);
        document.getElementById('stationInvestment').textContent = formatCurrency(stationInvestment);
        document.getElementById('annualFuelSavings').textContent = formatCurrency(totalAnnualFuelSavings);
        document.getElementById('annualMaintenanceSavings').textContent = formatCurrency(totalAnnualMaintenanceSavings);
        document.getElementById('totalInvestment').textContent = formatCurrency(totalInvestment);
        document.getElementById('annualTotalSavings').textContent = formatCurrency(annualTotalSavings);
        document.getElementById('paybackPeriod').textContent = paybackPeriod > 0 ? 
            `${paybackPeriod.toFixed(1)} years` : 'N/A';
        document.getElementById('netTotal').textContent = formatCurrency(netTotal);

    } catch (error) {
        console.error('Error in updateInvestmentAnalysis:', error);
        console.error('Error stack:', error.stack);
    }
}

// Event Listeners and Initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Initialize matrix
    initializeMatrix();

    // Add event listeners for all input fields
    const inputFields = [
        'lightDutyVehicles',
        'mediumDutyVehicles',
        'heavyDutyVehicles',
        'gasolinePrice',
        'dieselPrice',
        'cngRate'
    ];

    const selectFields = [
        'stationType',
        'business',
        'distributionStrategy'
    ];

    // Add input event listeners
    inputFields.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', () => {
                console.log(`Input changed for ${id}:`, element.value);
                if (document.getElementById('distributionStrategy').value !== 'custom') {
                    updateMatrixForDistributionStrategy();
                }
                updateInvestmentAnalysis();
            });
        }
    });

    // Add change event listeners for select fields
    selectFields.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', () => {
                console.log(`Selection changed for ${id}:`, element.value);
                if (id === 'distributionStrategy') {
                    if (element.value === 'custom') {
                        enableMatrixInputs();
                    } else {
                        disableMatrixInputs();
                        updateMatrixForDistributionStrategy();
                    }
                } else {
                    updateInvestmentAnalysis();
                }
            });
        }
    });

    // Initial calculations
    updateMatrixForDistributionStrategy();
    updateInvestmentAnalysis();
});
