// Repair Manuals
document.getElementById('get-repair-manual').addEventListener('click', function() {
    var make = document.getElementById('make').value;
    var model = document.getElementById('model').value;
    var year = document.getElementById('year').value;
    var repairManualContent = document.getElementById('repair-manual-content');
    
    // Simulate API call to retrieve repair manual content
    var repairManualData = {
        'harley-davidson': {
            'electra-glide': {
                '2020': 'Repair manual content for 2020 Harley-Davidson Electra Glide',
                '2019': 'Repair manual content for 2019 Harley-Davidson Electra Glide',
                '2018': 'Repair manual content for 2018 Harley-Davidson Electra Glide'
            }
        }
    };
    
    if (repairManualData[make] && repairManualData[make][model] && repairManualData[make][model][year]) {
        repairManualContent.innerHTML = repairManualData[make][model][year];
    } else {
        repairManualContent.innerHTML = 'Repair manual not found';
    }
});

// Wiring Diagrams
document.getElementById('get-wiring-diagram').addEventListener('click', function() {
    var make = document.getElementById('make').value;
    var model = document.getElementById('model').value;
    var year = document.getElementById('year').value;
    var wiringDiagramContent = document.getElementById('wiring-diagram-content');
    
    // Simulate API call to retrieve wiring diagram content
    var wiringDiagramData = {
        'harley-davidson': {
            'electra-glide': {
                '2020': 'Wiring diagram content for 2020 Harley-Davidson Electra Glide',
                '2019': 'Wiring diagram content for 2019 Harley-Davidson Electra Glide',
                '2018': 'Wiring diagram content for 2018 Harley-Davidson Electra Glide'
            }
        }
    };
    
    if (wiringDiagramData[make] && wiringDiagramData[make][model] && wiringDiagramData[make][model][year]) {
        wiringDiagramContent.innerHTML = wiringDiagramData[make][model][year];
    } else {
        wiringDiagramContent.innerHTML = 'Wiring diagram not found';
    }
});

// Troubleshooting
document.getElementById('troubleshoot').addEventListener('click', function() {
    var symptom = document.getElementById('symptom').value;
    var troubleshootingContent = document.getElementById('troubleshooting-content');
    
    // Simulate API call to retrieve troubleshooting content
    var troubleshootingData = {
        'symptom1': 'Troubleshooting content for symptom 1',
        'symptom2': 'Troubleshooting content for symptom 2'
    };
    
    if (troubleshootingData[symptom]) {
        troubleshootingContent.innerHTML = troubleshootingData[symptom];
    } else {
        troubleshootingContent.innerHTML = 'Troubleshooting content not found';
    }
});

// Engine Analyzer
document.getElementById('analyze-engine').addEventListener('click', function() {
    var engineType = document.getElementById('engine-type').value;
    var engineSize = document.getElementById('engine-size').value;
    var engineAnalyzerContent = document.getElementById('engine-analyzer-content');
    
    // Simulate API call to retrieve engine analyzer content
    var engineAnalyzerData = {
        'gasoline': {
            '1000': 'Engine analyzer content for 1000cc gasoline engine',
            '1200': 'Engine analyzer content for 1200cc gasoline engine'
        },
        'diesel': {
            '1000': 'Engine analyzer content for 1000cc diesel engine',
            '1200': 'Engine analyzer content for 1200cc diesel engine'
        }
    };
    
    if (engineAnalyzerData[engineType] && engineAnalyzerData[engineType][engineSize]) {
        engineAnalyzerContent.innerHTML = engineAnalyzerData[engineType][engineSize];
    } else {
        engineAnalyzerContent.innerHTML = 'Engine analyzer content not found';
    }
});

// Dynojet
document.getElementById('get-dynojet').addEventListener('click', function() {
    var bikeType = document.getElementById('bike-type').value;
    var bikeModel = document.getElementById('bike-model').value;
    var dynojetContent = document.getElementById('dynojet-content');
    
    // Simulate API call to retrieve dynojet content
    var dynojetData = {
        'harley-davidson': {
            'electra-glide': 'Dynojet content for Harley-Davidson Electra Glide',
            'gold-wing': 'Dynojet content for Harley-Davidson Gold Wing'
        },
        'honda': {
            'yzf-r6': 'Dynojet content for Honda YZF-R6'
        }
    };
    
    if (dynojetData[bikeType] && dynojetData[bikeType][bikeModel]) {
        dynojetContent.innerHTML = dynojetData[bikeType][bikeModel];
    } else {
        dynojetContent.innerHTML = 'Dynojet content not found';
    }
});
