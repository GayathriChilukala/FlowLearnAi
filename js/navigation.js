// Navigation Functions

function setTopic(topic) {
    document.getElementById('topicInput').value = topic;
}

function goToLevelSelection() {
    const topic = document.getElementById('topicInput').value.trim();
    if (!topic) {
        alert('Please enter a topic!');
        return;
    }
    currentTopic = topic;
    document.getElementById('selectedTopic').textContent = `Topic: ${topic}`;
    showScreen('step2');
}

function goBackToTopic() {
    showScreen('step1');
}

function selectLevel(level) {
    currentLevel = level;
    generateFlowchart();
}

function goHome() {
    stopTour();
    document.getElementById('topicInput').value = '';
    currentTopic = '';
    currentLevel = '';
    flowchartData = null;
    allNodes = [];
    showScreen('step1');
}

function showScreen(screen) {
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('viewer').classList.add('hidden');
    document.getElementById(screen).classList.remove('hidden');
}