// Flowchart Generation Functions

async function generateFlowchart() {
  showScreen('loading');
  animateProgress();

  const guide = complexityGuide[currentLevel];

  const prompt = `You are a flowchart expert. Create a ${currentLevel} complexity flowchart about: "${currentTopic}"

CRITICAL REQUIREMENTS:
1. Return ONLY valid JSON, no markdown formatting, no code blocks
2. The mermaidCode must be syntactically perfect
3. Every node in mermaidCode MUST have a matching entry in steps array
4. Node IDs must be sequential: A, B, C, D, E, F, G, H, I, J, K, L, M, N, O

JSON STRUCTURE (respond with this EXACT format):
{
"title": "Brief descriptive title (3-6 words)",
"complexity": "${currentLevel}",
"mermaidCode": "flowchart TD\\n    A[Start] --> B[Step 1]\\n    B --> C[Step 2]",
"steps": [
  {
    "nodeId": "A",
    "title": "Step 1: Clear Action",
    "explanation": "Detailed explanation of what happens in this step.",
    "subSteps": []
  }
]
}

MERMAID SYNTAX RULES (STRICT):
✓ Start with: flowchart TD
✓ Node IDs: ONLY capital letters A-Z
✓ Rectangle nodes: A[Text Here]
✓ Diamond decisions: B{Question?}
✓ Connections: A --> B
✓ Labeled connections: B -->|Yes| C or B -->|No| D
✓ Line separator: \\n between each line
✓ Keep node text SHORT (2-4 words maximum)
✗ DO NOT use: spaces in IDs, special characters, numbers in IDs
✗ DO NOT create: orphan nodes, duplicate IDs, broken connections

FOR ${currentLevel.toUpperCase()} COMPLEXITY:
${currentLevel === 'simple' ? `
- Create exactly 5-7 nodes (A through F or G)
- LINEAR FLOW ONLY (A → B → C → D → E → F)
- NO decision points, NO branches
- Simple subSteps array (can be empty [] for most steps)
- Example structure:
A[Start] --> B[Load Data] --> C[Process] --> D[Validate] --> E[Save] --> F[End]
` : currentLevel === 'detailed' ? `
- Create exactly 8-12 nodes (A through L)
- Include 1-2 decision diamonds
- Show YES/NO paths that merge back
- Add 2-3 subSteps for important steps
- Example structure:
A[Start] --> B[Init] --> C{Valid?}
C -->|Yes| D[Process]
C -->|No| E[Error]
D --> F[Continue]
E --> F
F --> G[Save] --> H[End]
` : `
- Create exactly 12-15 nodes (A through O)
- Include 2-3 decision points
- Add at least ONE loop (later node back to earlier)
- Add 3-5 subSteps for most steps
- Show error handling and edge cases
- Example structure:
A[Start] --> B[Init] --> C[Load]
C --> D{Valid?}
D -->|Yes| E[Process]
D -->|No| F[Log Error] --> C
E --> G{Complete?}
G -->|No| E
G -->|Yes| H[Save] --> I[Cleanup] --> J[End]
`}

VALIDATION CHECKLIST:
□ Every node has format: ID[Text] or ID{Text?}
□ Every connection uses -->
□ Every node ID appears in steps array
□ Steps array has exact same number as nodes
□ All subSteps are arrays (can be empty [])
□ No syntax errors in mermaidCode

EXAMPLE RESPONSE FOR "${currentTopic}" (${currentLevel}):
Generate a properly structured JSON following all rules above.

NOW CREATE THE FLOWCHART:`;

  try {
      const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${GITHUB_TOKEN}`
          },
          body: JSON.stringify({
              messages: [
                  {
                      role: "system",
                      content: "You are an expert flowchart generator that outputs ONLY valid JSON. Never use markdown code blocks. Ensure mermaid syntax is perfect. Match every node to a step."
                  },
                  {
                      role: "user",
                      content: prompt
                  }
              ],
              temperature: 0.5,
              max_tokens: 4000,
              model: MODEL,
              response_format: { type: "json_object" }
          })
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      let content = data.choices[0].message.content;
      
      // Clean up any markdown artifacts
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      flowchartData = JSON.parse(content);
      
      // Validate the data
      if (!flowchartData.steps || flowchartData.steps.length === 0) {
          throw new Error('No steps generated');
      }
      
      if (!flowchartData.mermaidCode || !flowchartData.mermaidCode.includes('flowchart')) {
          throw new Error('Invalid mermaid code');
      }
      
      // Validate node count matches
      const nodeCount = (flowchartData.mermaidCode.match(/[A-Z]\[/g) || []).length + 
                       (flowchartData.mermaidCode.match(/[A-Z]\{/g) || []).length;
      
      if (Math.abs(nodeCount - flowchartData.steps.length) > 2) {
          console.warn(`Node count mismatch: ${nodeCount} nodes vs ${flowchartData.steps.length} steps`);
      }
      
      console.log(`✅ Generated ${flowchartData.steps.length} steps for ${currentLevel} complexity`);
      console.log('Mermaid code:', flowchartData.mermaidCode);
      
      displayFlowchart();

  } catch (error) {
      console.error('❌ Error:', error);
      alert('Failed to generate flowchart. Please try again.\n\nError: ' + error.message);
      showScreen('step2');
  }
}

async function displayFlowchart() {
  showScreen('viewer');
  
  // Set title and complexity badge
  document.getElementById('flowchartTitle').textContent = flowchartData.title || currentTopic;
  
  const badgeHTML = `<span class="complexity-badge complexity-${currentLevel}">${currentLevel.toUpperCase()}</span>`;
  document.getElementById('complexityBadge').innerHTML = badgeHTML;
  
  // Render diagram
  const diagramDiv = document.getElementById('mermaidDiagram');
  diagramDiv.removeAttribute('data-processed');
  diagramDiv.textContent = flowchartData.mermaidCode;
  
  try {
      // Clear any previous diagram
      const container = document.getElementById('diagramContainer');
      const oldSvg = container.querySelector('svg');
      if (oldSvg) oldSvg.remove();
      
      await mermaid.run({ querySelector: '.mermaid' });
      
      // Wait for nodes to render, then select ONLY main flowchart nodes
      setTimeout(() => {
          // CRITICAL FIX: Select only g elements with IDs matching flowchart-X-N pattern
          const allGElements = document.querySelectorAll('.mermaid g[id^="flowchart-"]');
          
          // Filter to get ONLY main node groups (pattern: flowchart-A-0, flowchart-B-1, etc.)
          allNodes = Array.from(allGElements).filter(node => {
              const id = node.id || '';
              // Match pattern: flowchart-LETTER-NUMBER (single capital letter)
              return /^flowchart-[A-Z]-\d+$/.test(id);
          });
          
          console.log(`📍 Found ${allNodes.length} main flowchart nodes (filtered from ${allGElements.length} total)`);
          
          // Log each main node
          allNodes.forEach((node, i) => {
              const label = node.querySelector('.nodeLabel, .label');
              const labelText = label ? label.textContent?.trim().substring(0, 30) : 'no label';
              console.log(`  Node ${i}: ${node.id} "${labelText}"`);
          });
      }, 1000);
      
  } catch (error) {
      console.error('Mermaid rendering error:', error);
      diagramDiv.innerHTML = `<div class="text-red-500 text-xl p-8">
          <p class="font-bold mb-2">❌ Diagram Rendering Error</p>
          <p class="text-sm">The flowchart couldn't be rendered. Try a different topic or complexity level.</p>
          <details class="mt-4 text-xs">
              <summary class="cursor-pointer">Show technical details</summary>
              <pre class="mt-2 bg-gray-100 p-2 rounded">${error.message}</pre>
          </details>
      </div>`;
  }

  // Update progress
  document.getElementById('progressInfo').textContent = `0 of ${flowchartData.steps.length} steps`;
}