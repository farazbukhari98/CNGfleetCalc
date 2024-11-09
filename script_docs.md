# CNG Calculator: script.js Documentation

## Structure Overview

### 1. Constants (CONSTANTS Object)
```javascript
Key configurations stored for:
- Vehicle costs
- Annual miles
- Base MPG values
- CNG loss factors
- Vehicle lifespans
- Maintenance costs
- Business rates
- Station configurations (Fast Fill & Time Fill)
```

### 2. Matrix State Management
```javascript
matrixState object tracks:
- Vehicle distributions (15 years)
- Running totals
- Cumulative fleet sizes

Purpose:
- Maintains current state of vehicle purchase matrix
- Enables calculations based on distribution
- Tracks fleet growth over time
```

## Core Functions

### 1. Utility Functions
```javascript
calculateCNGMPG():
- Calculates adjusted MPG after CNG conversion
- Input: Base MPG and loss factor
- Output: Adjusted MPG

calculateAnnualGGE():
- Calculates annual fuel consumption
- Input: Vehicle type and count
- Output: Annual GGE required

formatCurrency():
- Formats numbers as currency
- Input: Number value
- Output: Formatted string with $ symbol
```

### 2. Matrix Functions
```javascript
initializeMatrix():
- Creates 15-year matrix structure
- Sets up table headers and rows
- Creates input cells for each year

updateMatrixDisplay():
- Updates matrix with current values
- Reflects distribution strategy changes
- Updates input field values

calculateCumulativeFleets():
- Tracks running total of vehicles
- Calculates fleet size for each year
- Updates cumulative fleet counts
```

### 3. Distribution Strategy Functions
```javascript
updateMatrixForDistributionStrategy():
- Handles different distribution patterns:
  * Immediate: All vehicles in Year 1
  * Gradual (5 Years): Even distribution over 5 years
  * Gradual (10 Years): Even distribution over 10 years
  * Gradual (15 Years): Even distribution over 15 years
  * Custom: User-defined distribution

enableMatrixInputs() / disableMatrixInputs():
- Controls matrix interactivity
- Enables/disables input fields
- Manages event listeners

handleMatrixInputChange():
- Processes matrix cell updates
- Validates input values
- Updates calculations
```

### 4. Investment Analysis Function
```javascript
updateInvestmentAnalysis():

1. Input Processing:
   - Gets current fuel prices
   - Gets station and business selections
   - Retrieves vehicle counts

2. Vehicle Investment Calculation:
   - Calculates year-by-year investments
   - Considers distribution pattern
   - Sums total vehicle costs

3. Station Sizing:
   - Calculates maximum annual GGE
   - Determines appropriate station size
   - Calculates station investment

4. Savings Calculations:
   - Annual Fuel Savings:
     * Compares conventional vs CNG costs
     * Considers fuel efficiency differences
     * Accounts for business rates
   
   - Annual Maintenance Savings:
     * Calculates maintenance cost differences
     * Considers vehicle types and counts
     * Accounts for annual mileage

5. Financial Metrics:
   - Calculates total investment
   - Determines annual total savings
   - Computes payback period
   - Projects 15-year net total

6. Display Updates:
   - Updates all result fields
   - Formats values appropriately
   - Handles error conditions
```

## Event Handling

### 1. Input Field Events
```javascript
Monitors changes to:
- Vehicle counts
- Fuel prices
- Station type
- Business selection

Actions:
- Triggers matrix updates
- Recalculates investments
- Updates display values
```

### 2. Distribution Strategy Events
```javascript
Monitors strategy changes:
- Enables/disables matrix inputs
- Updates distribution pattern
- Triggers recalculations

Custom Mode:
- Enables manual matrix editing
- Validates user inputs
- Maintains running totals
```

## Calculation Flow

1. **User Input**
   ```
   - Changes vehicle counts
   - Selects distribution strategy
   - Updates fuel prices
   - Modifies matrix (in custom mode)
   ```

2. **Matrix Update**
   ```
   - Applies distribution strategy
   - Updates matrix display
   - Calculates cumulative fleets
   ```

3. **Investment Analysis**
   ```
   - Calculates investments
   - Determines savings
   - Updates financial metrics
   ```

4. **Display Update**
   ```
   - Shows new values
   - Formats results
   - Indicates calculation status
   ```

## Error Handling
```javascript
- Validates numeric inputs
- Handles invalid matrix entries
- Catches calculation errors
- Provides console error logging
```

## Key Features

1. **Real-time Updates**
   ```
   - Immediate calculation updates
   - Live matrix validation
   - Dynamic financial projections
   ```

2. **Flexible Distribution**
   ```
   - Multiple distribution strategies
   - Custom distribution option
   - Automatic calculations
   ```

3. **Comprehensive Analysis**
   ```
   - Vehicle investments
   - Station sizing
   - Fuel savings
   - Maintenance savings
   - Financial projections
   ```

This script provides a complete solution for:
1. Vehicle distribution planning
2. Investment calculation
3. Savings projection
4. Financial analysis
5. User interaction handling