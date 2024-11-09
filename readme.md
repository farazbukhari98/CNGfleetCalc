# CNG Fleet Calculator - Implementation Documentation

## Project Overview
The CNG Fleet Calculator is a standalone desktop tool designed to help fleet managers evaluate the financial viability of converting their vehicle fleet from conventional fuels (gasoline/diesel) to Compressed Natural Gas (CNG). The calculator provides insights into costs, savings, and return on investment (ROI) over a 15-year period.

## Current Implementation Status

### 1. Core Files Structure
```
CNG_Fleet_Calculator/
├── index.html          # Main application file
├── css/
│   ├── main.css       # Compiled Tailwind CSS
│   ├── styles.css     # Custom styles
│   └── tailwind.css   # Tailwind source file
├── js/
│   └── script.js      # Core calculation logic
├── package.json       # Project configuration
└── tailwind.config.js # Tailwind configuration
```

### 2. Features Implemented

#### User Interface
- **Vehicle Configuration Section**
  - Light Duty Vehicle input
  - Medium Duty Vehicle input
  - Heavy Duty Vehicle input
  - Distribution Strategy selector (Immediate/Gradual/Custom)

- **Station Configuration Section**
  - Station Type selector (Fast Fill/Time Fill)
  - Business Type selector (AGLC/CGC)

- **Fuel Prices Section**
  - Gasoline price input (Default: $3.38/gallon)
  - Diesel price input (Default: $3.84/gallon)
  - CNG Commodity Rate input (Default: $0.74/GGE)

- **Investment Analysis Display**
  - Vehicle Investment
  - Station Investment
  - Annual Fuel Savings
  - Annual Maintenance Savings
  - Total Investment
  - Annual Total Savings
  - Payback Period
  - Net Total (15 years)

- **Vehicle Purchase Matrix**
  - 15-year planning grid
  - Dynamic updates based on distribution strategy
  - Real-time calculations
  - Cumulative fleet size tracking
  - Annual GGE calculations per year

#### Enhanced Calculation Logic
- **Vehicle Investment Calculations**
  - Per-vehicle type cost analysis
  - Distribution strategy impact assessment
  - Cumulative investment tracking

- **Station Sizing and Investment**
  - Automatic station size determination based on GGE requirements
  - Dynamic cost adjustment based on capacity needs
  - Station type cost differentials (Fast Fill vs Time Fill)

- **Fuel Economy and Consumption**
  - CNG Fuel Economy calculations with loss factors:
    - Light Duty: 5% loss
    - Medium Duty: 7.5% loss
    - Heavy Duty: 10% loss
  - Annual GGE calculations with vehicle-specific factors
  - Real-time GGE requirement updates

- **Business Rate Integration**
  - AGLC rate calculations (18.0% per year)
  - CGC rate calculations (19.2% per year)
  - Impact on CNG cost effectiveness

- **Comprehensive Savings Analysis**
  - Fuel cost comparisons:
    - Light Duty: CNG vs Gasoline
    - Medium/Heavy Duty: CNG vs Diesel
  - Maintenance cost differentials:
    - Gas/CNG: $0.47 per mile
    - Diesel: $0.52 per mile
  - Combined annual savings projections

- **Investment Analysis**
  - Real-time ROI calculations
  - Dynamic payback period updates
  - 15-year net total projections
  - Distribution strategy impact analysis

### 3. Technical Implementation

#### Frontend Framework
- Vanilla JavaScript for maximum portability
- Tailwind CSS for styling (compiled locally)
- Custom CSS for specific styling needs

#### Enhanced Features
- **Real-time Update System**
  - Immediate calculation updates on any input change
  - Cascading updates through dependent values
  - Synchronized matrix and analysis updates

- **Intelligent Calculation Sequencing**
  - First Level: Direct calculation updates
  - Second Level: Combined calculation updates
  - Final Level: Long-term projection updates

- **Distribution Strategy Implementation**
  - Immediate Purchase (all vehicles in year 1)
  - Gradual (5 years) with even distribution
  - Gradual (10 years) with even distribution
  - Gradual (15 years) with even distribution
  - Custom with manual year-by-year input

- **Matrix Integration**
  - Dynamic row and column generation
  - Real-time total calculations
  - Cumulative fleet size tracking
  - Annual GGE calculations
  - Investment distribution visualization

### 4. Constants and Default Values

#### Vehicle Costs
- Light Duty: $15,000 per vehicle
- Medium Duty: $15,000 per vehicle
- Heavy Duty: $50,000 per vehicle

#### Base MPG Values
- Light Duty: 12 MPG
- Medium Duty: 10 MPG
- Heavy Duty: 5 MPG

#### Annual Mileage
- Light Duty: 15,000 miles
- Medium Duty: 20,000 miles
- Heavy Duty: 40,000 miles

#### Maintenance Costs
- Gasoline and CNG Vehicles: $0.47 per mile
- Diesel Vehicles: $0.52 per mile

### 5. Usage Instructions

1. Open index.html in any modern web browser
2. Enter the number of vehicles for each duty type
3. Select a distribution strategy
4. Choose station configuration options
5. Adjust fuel prices if needed
6. View real-time updates in the Investment Analysis section
7. If using custom distribution, enter vehicle numbers in the matrix

### 6. Real-time Update Behavior

#### Vehicle Configuration Changes
- Immediate update of vehicle investment calculations
- Automatic station size recalculation
- Update of all dependent savings calculations
- Matrix distribution adjustment (if not custom)

#### Station Configuration Changes
- Immediate station cost recalculation
- Update of total investment figures
- Adjustment of payback period
- Recalculation of 15-year projections

#### Fuel Price Changes
- Instant update of fuel savings calculations
- Recalculation of annual total savings
- Adjustment of payback period
- Update of 15-year net total

#### Distribution Strategy Changes
- Automatic matrix redistribution
- Update of year-by-year investments
- Recalculation of cumulative fleet size
- Adjustment of annual GGE requirements

### 7. Technical Notes

- The application is completely client-side and requires no server
- All calculations are performed in real-time using JavaScript
- The interface is responsive and works on both desktop and mobile devices
- Custom styling ensures consistent appearance across different browsers
- Form validation prevents invalid input values
- The matrix supports both automatic and manual distribution of vehicles
- Enhanced calculation accuracy with proper sequencing of updates
- Optimized performance for immediate user feedback
