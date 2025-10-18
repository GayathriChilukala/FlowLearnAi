// Tour Control Functions - WITH TEACHER CHARACTER

// Teacher helper functions
function showTeacher() {
    document.getElementById('teacherCharacter').style.display = 'flex';
}

function hideTeacher() {
    document.getElementById('teacherCharacter').style.display = 'none';
    document.getElementById('teacherBubble').classList.add('hidden');
}

let currentTypingTimeout = null;

function teacherSay(message) {
    const bubble = document.getElementById('teacherBubble');
    const avatar = document.getElementById('teacherAvatar');
    const text = document.getElementById('teacherText');
    
    console.log('👩‍🏫 Teacher saying:', message.substring(0, 50) + '...');
    
    // Clear any previous typing
    if (currentTypingTimeout) {
        clearTimeout(currentTypingTimeout);
        currentTypingTimeout = null;
    }
    
    // Clear previous text and show bubble
    text.textContent = '';
    bubble.classList.remove('hidden');
    bubble.classList.add('typing');
    avatar.classList.add('talking');
    
    // Typing effect - show text character by character
    let index = 0;
    const typingSpeed = 30; // milliseconds per character
    
    function typeNextChar() {
        if (index < message.length) {
            text.textContent += message.charAt(index);
            index++;
            currentTypingTimeout = setTimeout(typeNextChar, typingSpeed);
        } else {
            // Typing complete
            console.log('✅ Typing complete');
            avatar.classList.remove('talking');
            bubble.classList.remove('typing');
            currentTypingTimeout = null;
        }
    }
    
    // Start typing immediately
    typeNextChar();
}

function changeTeacherMood(emoji) {
    // Keep teacher as 👩‍🏫
}

function startTour() {
    if (!flowchartData || flowchartData.steps.length === 0) return;
    
    isPlaying = true;
    currentStepIndex = 0;
    currentSubStepIndex = 0;
    document.getElementById('startBtn').classList.add('hidden');
    document.getElementById('pauseBtn').classList.remove('hidden');
    document.getElementById('pointer').style.display = 'block';
    document.getElementById('highlightRing').style.display = 'block';
    
    // Show teacher
    showTeacher();
    teacherSay(`Welcome! Let's explore this ${flowchartData.steps.length}-step flowchart together. I'll explain everything as we go!`);
    
    console.log('🚀 Starting tour with', flowchartData.steps.length, 'steps');
    
    setTimeout(() => {
        playStep();
    }, 5500);
}

function playStep() {
    if (!isPlaying) {
        console.log('ℹ️ Tour stopped');
        stopTour();
        return;
    }
    
    if (currentStepIndex >= flowchartData.steps.length) {
        console.log('🎉 Tour complete!');
        stopTour();
        return;
    }

    if (currentSubStepIndex !== 0) {
        console.error(`⚠️ BUG: playStep with subIndex=${currentSubStepIndex}`);
        currentSubStepIndex = 0;
    }

    const step = flowchartData.steps[currentStepIndex];
    const subStepsCount = step.subSteps?.length || 0;
    console.log(`\n╔══ STEP ${currentStepIndex + 1}/${flowchartData.steps.length}: ${step.nodeId} (${subStepsCount} sub-steps) ══╗`);
    playMainStep(step);
}

function playMainStep(step) {
    console.log(`  ▶️ Playing MAIN step: ${step.title}`);
    
    // Move pointer first
    movePointerToNode(step.nodeId);
    
    // Get the full explanation text that will be spoken
    const fullText = `${step.title}. ${step.explanation}`;
    
    // Teacher displays exactly what is being spoken
    teacherSay(fullText);
    
    // Update UI
    document.getElementById('currentStep').innerHTML = `
        <strong class="text-purple-600 text-2xl">${step.title}</strong><br><br>
        <span class="text-gray-800">${step.explanation}</span>
    `;

    const hasSubSteps = step.subSteps && step.subSteps.length > 0;
    
    if (hasSubSteps) {
        const subStepsHTML = step.subSteps.map((sub, idx) => `<li class="text-sm">${sub}</li>`).join('');
        document.getElementById('subStepsList').innerHTML = subStepsHTML;
        document.getElementById('subStepsContainer').classList.remove('hidden');
        document.getElementById('subStepInfo').classList.remove('hidden');
        document.getElementById('subStepInfo').textContent = `Sub-step 0 of ${step.subSteps.length}`;
    } else {
        document.getElementById('subStepsContainer').classList.add('hidden');
        document.getElementById('subStepInfo').classList.add('hidden');
    }

    document.getElementById('progressInfo').textContent = `Step ${currentStepIndex + 1} of ${flowchartData.steps.length}`;

    speak(fullText);

    // Clear any old timeout
    if (tourTimeout) {
        clearTimeout(tourTimeout);
        tourTimeout = null;
    }

    const waitTime = hasSubSteps ? 8000 : 9000;
    console.log(`  ⏱️ Waiting ${waitTime}ms, then ${hasSubSteps ? 'play sub-steps' : 'next main step'}`);

    tourTimeout = setTimeout(() => {
        if (!isPlaying) return;
        
        if (hasSubSteps) {
            console.log(`  ➡️ Starting sub-steps`);
            teacherSay(`Now let me break this down into ${step.subSteps.length} detailed sub-steps.`);
            setTimeout(() => {
                currentSubStepIndex = 0;
                playFirstSubStep(step);
            }, 3000);
        } else {
            console.log(`  ➡️ Next main step`);
            currentStepIndex++;
            currentSubStepIndex = 0;
            playStep();
        }
    }, waitTime);
}

function playFirstSubStep(step) {
    if (!isPlaying || !step.subSteps || step.subSteps.length === 0) {
        console.log('  ⚠️ No sub-steps, moving on');
        currentStepIndex++;
        currentSubStepIndex = 0;
        playStep();
        return;
    }
    
    console.log(`  📋 Playing sub-step 1/${step.subSteps.length}`);
    
    const subStep = step.subSteps[0];
    
    // Teacher displays the exact sub-step text being spoken
    teacherSay(subStep);
    
    // Highlight first sub-step
    const subStepItems = document.querySelectorAll('#subStepsList li');
    subStepItems.forEach((item, idx) => {
        if (idx === 0) {
            item.className = 'text-sm font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded';
        } else {
            item.className = 'text-sm';
        }
    });

    document.getElementById('subStepInfo').textContent = `Sub-step 1 of ${step.subSteps.length}`;
    speak(subStep);

    if (tourTimeout) {
        clearTimeout(tourTimeout);
        tourTimeout = null;
    }

    const waitTime = Math.max(5000, subStep.length * 60);

    tourTimeout = setTimeout(() => {
        if (!isPlaying) return;
        
        if (step.subSteps.length > 1) {
            playNextSubStep(step, 1);
        } else {
            console.log(`  ✅ All sub-steps done`);
            currentStepIndex++;
            currentSubStepIndex = 0;
            playStep();
        }
    }, waitTime);
}

function playNextSubStep(step, subIndex) {
    if (!isPlaying) return;
    
    if (subIndex >= step.subSteps.length) {
        console.log(`  ✅ All sub-steps done`);
        currentStepIndex++;
        currentSubStepIndex = 0;
        playStep();
        return;
    }
    
    console.log(`  📋 Playing sub-step ${subIndex + 1}/${step.subSteps.length}`);
    
    const subStep = step.subSteps[subIndex];
    
    // Teacher displays the exact sub-step text
    teacherSay(subStep);
    
    const subStepItems = document.querySelectorAll('#subStepsList li');
    subStepItems.forEach((item, idx) => {
        if (idx === subIndex) {
            item.className = 'text-sm font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded';
        } else if (idx < subIndex) {
            item.className = 'text-sm text-gray-400 line-through';
        } else {
            item.className = 'text-sm';
        }
    });

    document.getElementById('subStepInfo').textContent = `Sub-step ${subIndex + 1} of ${step.subSteps.length}`;
    speak(subStep);

    if (tourTimeout) {
        clearTimeout(tourTimeout);
        tourTimeout = null;
    }

    const waitTime = Math.max(5000, subStep.length * 60);

    tourTimeout = setTimeout(() => {
        if (!isPlaying) return;
        playNextSubStep(step, subIndex + 1);
    }, waitTime);
}

function movePointerToNode(nodeId) {
    console.log(`  🎯 Moving pointer to node ${nodeId}`);
    
    let targetNode = allNodes.find(node => {
        const id = node.id || '';
        return id.includes(`flowchart-${nodeId}-`);
    });
    
    if (!targetNode && currentStepIndex < allNodes.length) {
        console.log(`  ⚠️ Using fallback index ${currentStepIndex}`);
        targetNode = allNodes[currentStepIndex];
    }
    
    if (!targetNode) {
        console.error(`  ❌ Node ${nodeId} not found`);
        return;
    }

    const label = targetNode.querySelector('.nodeLabel, .label');
    const labelText = label ? label.textContent?.trim() : '';
    console.log(`  ✅ Found: "${labelText}"`);

    const rect = targetNode.getBoundingClientRect();
    const container = document.getElementById('diagramContainer').getBoundingClientRect();
    
    const pointer = document.getElementById('pointer');
    const highlight = document.getElementById('highlightRing');
    
    const pointerLeft = Math.round(rect.left - container.left + rect.width / 2 - 20);
    const pointerTop = Math.round(rect.top - container.top + rect.height / 2 - 20);
    
    pointer.style.setProperty('left', `${pointerLeft}px`, 'important');
    pointer.style.setProperty('top', `${pointerTop}px`, 'important');
    pointer.style.setProperty('display', 'block', 'important');
    
    const highlightLeft = Math.round(rect.left - container.left - 10);
    const highlightTop = Math.round(rect.top - container.top - 10);
    const highlightWidth = Math.round(rect.width + 20);
    const highlightHeight = Math.round(rect.height + 20);
    
    highlight.style.setProperty('left', `${highlightLeft}px`, 'important');
    highlight.style.setProperty('top', `${highlightTop}px`, 'important');
    highlight.style.setProperty('width', `${highlightWidth}px`, 'important');
    highlight.style.setProperty('height', `${highlightHeight}px`, 'important');
    highlight.style.setProperty('display', 'block', 'important');
    
    allNodes.forEach(n => n.classList.remove('active'));
    targetNode.classList.add('active');
    targetNode.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
}

function speak(text) {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = parseFloat(document.getElementById('speedSelect').value);
    utterance.pitch = 1;
    utterance.volume = 1;
    
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => 
        v.lang.startsWith('en') && 
        (v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Samantha'))
    ) || voices.find(v => v.lang.startsWith('en'));
    
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
}

function pauseTour() {
    isPlaying = false;
    if (tourTimeout) clearTimeout(tourTimeout);
    window.speechSynthesis.pause();
    document.getElementById('startBtn').classList.remove('hidden');
    document.getElementById('startBtn').innerHTML = '▶️ Resume';
    document.getElementById('pauseBtn').classList.add('hidden');
    
    teacherSay("Taking a break? No problem! Click Resume when you're ready to continue.");
}

function stopTour() {
    isPlaying = false;
    if (tourTimeout) {
        clearTimeout(tourTimeout);
        tourTimeout = null;
    }
    window.speechSynthesis.cancel();
    document.getElementById('pointer').style.display = 'none';
    document.getElementById('highlightRing').style.display = 'none';
    document.getElementById('currentStep').textContent = 'Tour complete! Click "Start Tour" to watch again.';
    document.getElementById('subStepsContainer').classList.add('hidden');
    document.getElementById('subStepInfo').classList.add('hidden');
    document.getElementById('startBtn').classList.remove('hidden');
    document.getElementById('startBtn').innerHTML = '▶️ Start Tour';
    document.getElementById('pauseBtn').classList.add('hidden');
    allNodes.forEach(n => n.classList.remove('active'));
    currentStepIndex = 0;
    currentSubStepIndex = 0;
    
    teacherSay("Excellent work! You've completed the entire flowchart. Great job learning!");
    setTimeout(() => {
        hideTeacher();
    }, 6000);
}

function restartTour() {
    stopTour();
    setTimeout(startTour, 100);
}

function skipToNext() {
    if (!isPlaying) return;
    
    if (tourTimeout) clearTimeout(tourTimeout);
    window.speechSynthesis.cancel();
    
    const currentStep = flowchartData.steps[currentStepIndex];
    const hasSubSteps = currentStep && currentStep.subSteps && currentStep.subSteps.length > 0;
    
    if (hasSubSteps && currentSubStepIndex < currentStep.subSteps.length) {
        currentSubStepIndex++;
        if (currentSubStepIndex >= currentStep.subSteps.length) {
            currentStepIndex++;
            currentSubStepIndex = 0;
        }
    } else {
        currentStepIndex++;
        currentSubStepIndex = 0;
    }
    
    playStep();
}