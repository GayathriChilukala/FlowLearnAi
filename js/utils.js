// Utility Functions

function animateProgress() {
    const messages = [
        'Analyzing complexity... 🔍',
        'Creating flowchart structure... 🎨',
        'Adding decision points... 🔀',
        'Writing step explanations... ✏️',
        'Adding sub-steps... 📋',
        'Preparing voice tour... 🎤',
        'Almost done... 🚀'
    ];

    let progress = 0;
    let msgIndex = 0;

    const interval = setInterval(() => {
        progress += Math.floor(100 / messages.length);
        if (progress > 100) progress = 100;
        document.getElementById('progressBar').style.width = progress + '%';
        
        if (msgIndex < messages.length) {
            document.getElementById('loadingText').textContent = messages[msgIndex++];
        }

        if (progress >= 100) clearInterval(interval);
    }, 2500);
}

function downloadFlowchart() {
    if (!flowchartData) {
        alert('No flowchart available to download!');
        return;
    }

    // Show download options
    const options = `
    <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; align-items: center; justify-content: center; overflow-y: auto; padding: 20px;" id="downloadModal" onclick="if(event.target.id==='downloadModal') closeDownloadModal()">
        <div style="background: white; padding: 30px; border-radius: 20px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto;" onclick="event.stopPropagation()">
            <h3 style="font-size: 28px; font-weight: bold; margin-bottom: 10px; color: #333; text-align: center;">📥 Download Flowchart</h3>
            <p style="color: #666; margin-bottom: 25px; text-align: center;">Choose your preferred format:</p>
            
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="background: #f3f4f6; padding: 12px; border-radius: 12px;">
                    <h4 style="font-weight: bold; color: #374151; margin-bottom: 8px; font-size: 14px;">📸 Image Formats</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <button onclick="downloadAsPNG()" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 10px; border: none; font-size: 16px; font-weight: bold; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                            🖼️ Download as PNG (High Quality)
                        </button>
                        <button onclick="downloadAsJPG()" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 15px; border-radius: 10px; border: none; font-size: 16px; font-weight: bold; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                            📷 Download as JPG (Compressed)
                        </button>
                        <button onclick="downloadAsSVG()" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #333; padding: 15px; border-radius: 10px; border: none; font-size: 16px; font-weight: bold; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                            🔍 Download as SVG (Vector)
                        </button>
                    </div>
                </div>

                <div style="background: #f3f4f6; padding: 12px; border-radius: 12px;">
                    <h4 style="font-weight: bold; color: #374151; margin-bottom: 8px; font-size: 14px;">📄 Document Formats</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <button onclick="downloadAsPDF()" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%); color: white; padding: 15px; border-radius: 10px; border: none; font-size: 16px; font-weight: bold; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                            📕 Download as PDF Document
                        </button>
                        <button onclick="downloadAsDOCX()" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 15px; border-radius: 10px; border: none; font-size: 16px; font-weight: bold; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                            📘 Download as Word Document (DOCX)
                        </button>
                    </div>
                </div>

                <div style="background: #f3f4f6; padding: 12px; border-radius: 12px;">
                    <h4 style="font-weight: bold; color: #374151; margin-bottom: 8px; font-size: 14px;">💾 Data Formats</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <button onclick="downloadAsJSON()" style="background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%); color: white; padding: 15px; border-radius: 10px; border: none; font-size: 16px; font-weight: bold; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                            📊 Download as JSON Data
                        </button>
                        <button onclick="downloadAsMermaid()" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 15px; border-radius: 10px; border: none; font-size: 16px; font-weight: bold; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                            📝 Download Mermaid Code
                        </button>
                    </div>
                </div>
            </div>
            
            <button onclick="closeDownloadModal()" style="margin-top: 20px; background: #e5e7eb; color: #333; padding: 12px 20px; border-radius: 10px; border: none; font-size: 16px; cursor: pointer; width: 100%; font-weight: 600; transition: background 0.2s;" onmouseover="this.style.background='#d1d5db'" onmouseout="this.style.background='#e5e7eb'">
                Cancel
            </button>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', options);
}

function closeDownloadModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) modal.remove();
}

async function downloadAsPNG() {
    closeDownloadModal();
    showLoadingMessage('Generating PNG image...');
    
    try {
        if (typeof html2canvas === 'undefined') {
            hideLoadingMessage();
            alert('Loading required library... Please wait 3 seconds and try again.');
            loadHtml2Canvas();
            return;
        }

        const diagramContainer = document.getElementById('diagramContainer');
        const canvas = await html2canvas(diagramContainer, {
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false,
            useCORS: true
        });
        
        canvas.toBlob(function(blob) {
            const link = document.createElement('a');
            link.download = `${sanitizeFilename(flowchartData.title)}_flowchart.png`;
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
            hideLoadingMessage();
        });
    } catch (error) {
        console.error('PNG export error:', error);
        hideLoadingMessage();
        alert('PNG export failed. Trying alternative method...');
        downloadAsPNGFallback();
    }
}

function downloadAsPNGFallback() {
    const svg = document.querySelector('#mermaidDiagram svg');
    if (!svg) {
        alert('Flowchart not found!');
        return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const svgRect = svg.getBoundingClientRect();
    canvas.width = svgRect.width * 3;
    canvas.height = svgRect.height * 3;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.onload = function() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(function(blob) {
            const link = document.createElement('a');
            link.download = `${sanitizeFilename(flowchartData.title)}_flowchart.png`;
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(url);
            URL.revokeObjectURL(link.href);
        });
    };
    img.onerror = function() {
        alert('Failed to export PNG. Please try SVG format instead.');
        URL.revokeObjectURL(url);
    };
    img.src = url;
}

async function downloadAsJPG() {
    closeDownloadModal();
    showLoadingMessage('Generating JPG image...');
    
    try {
        if (typeof html2canvas === 'undefined') {
            hideLoadingMessage();
            alert('Loading required library... Please wait 3 seconds and try again.');
            loadHtml2Canvas();
            return;
        }

        const diagramContainer = document.getElementById('diagramContainer');
        const canvas = await html2canvas(diagramContainer, {
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false,
            useCORS: true
        });
        
        canvas.toBlob(function(blob) {
            const link = document.createElement('a');
            link.download = `${sanitizeFilename(flowchartData.title)}_flowchart.jpg`;
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
            hideLoadingMessage();
        }, 'image/jpeg', 0.95);
    } catch (error) {
        console.error('JPG export error:', error);
        hideLoadingMessage();
        alert('JPG export failed: ' + error.message);
    }
}

function downloadAsSVG() {
    closeDownloadModal();
    
    const svg = document.querySelector('#mermaidDiagram svg');
    if (!svg) {
        alert('Flowchart not found!');
        return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    const link = document.createElement('a');
    link.download = `${sanitizeFilename(flowchartData.title)}_flowchart.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}

async function downloadAsPDF() {
    closeDownloadModal();
    showLoadingMessage('Generating PDF document...');
    
    try {
        if (typeof jspdf === 'undefined') {
            hideLoadingMessage();
            alert('Loading PDF library... Please wait 3 seconds and try again.');
            loadJsPDF();
            return;
        }

        const { jsPDF } = jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        // Add title
        doc.setFontSize(22);
        doc.setFont(undefined, 'bold');
        doc.text(flowchartData.title || 'Flowchart', 105, 20, { align: 'center' });
        
        // Add complexity badge
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text(`Complexity: ${flowchartData.complexity.toUpperCase()}`, 105, 28, { align: 'center' });
        
        doc.setLineWidth(0.5);
        doc.line(20, 32, 190, 32);
        
        let yPos = 40;
        
        // Capture diagram as image
        if (typeof html2canvas !== 'undefined') {
            try {
                const diagramContainer = document.getElementById('diagramContainer');
                const canvas = await html2canvas(diagramContainer, {
                    scale: 2,
                    backgroundColor: '#ffffff',
                    logging: false
                });
                
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 170;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                if (yPos + imgHeight > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                
                doc.addImage(imgData, 'PNG', 20, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 10;
            } catch (e) {
                console.log('Could not add diagram image to PDF');
            }
        }
        
        // Add steps
        doc.addPage();
        yPos = 20;
        
        doc.setFontSize(18);
        doc.setFont(undefined, 'bold');
        doc.text('Detailed Steps', 20, yPos);
        yPos += 10;
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        
        flowchartData.steps.forEach((step, index) => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            
            // Step title
            doc.setFont(undefined, 'bold');
            doc.setFontSize(12);
            const stepTitle = `${index + 1}. ${step.title}`;
            doc.text(stepTitle, 20, yPos);
            yPos += 7;
            
            // Step explanation
            doc.setFont(undefined, 'normal');
            doc.setFontSize(10);
            const explanationLines = doc.splitTextToSize(step.explanation, 170);
            doc.text(explanationLines, 20, yPos);
            yPos += explanationLines.length * 5 + 3;
            
            // Sub-steps
            if (step.subSteps && step.subSteps.length > 0) {
                doc.setFont(undefined, 'italic');
                doc.setFontSize(9);
                step.subSteps.forEach((subStep, subIndex) => {
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                    const subStepLines = doc.splitTextToSize(`   ${String.fromCharCode(97 + subIndex)}) ${subStep}`, 165);
                    doc.text(subStepLines, 25, yPos);
                    yPos += subStepLines.length * 4.5 + 2;
                });
            }
            
            yPos += 5;
        });
        
        // Save the PDF
        doc.save(`${sanitizeFilename(flowchartData.title)}_flowchart.pdf`);
        hideLoadingMessage();
    } catch (error) {
        console.error('PDF export error:', error);
        hideLoadingMessage();
        alert('PDF export failed: ' + error.message);
    }
}

async function downloadAsDOCX() {
    closeDownloadModal();
    showLoadingMessage('Generating Word document with flowchart image...');
    
    try {
        // Check if docx library is loaded
        if (typeof window.docx === 'undefined') {
            hideLoadingMessage();
            
            // Wait for docx to load
            const checkDocx = new Promise((resolve) => {
                const maxWait = 10000;
                const startTime = Date.now();
                
                const checkInterval = setInterval(() => {
                    if (typeof window.docx !== 'undefined') {
                        clearInterval(checkInterval);
                        resolve(true);
                    } else if (Date.now() - startTime > maxWait) {
                        clearInterval(checkInterval);
                        resolve(false);
                    }
                }, 100);
            });
            
            const isLoaded = await checkDocx;
            
            if (!isLoaded) {
                alert('⏳ DOCX library is still loading...\n\nPlease wait 5-10 seconds and try again.');
                return;
            }
            
            showLoadingMessage('DOCX library loaded! Capturing flowchart...');
        }

        // Access the DOCX library
        let Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType, ImageRun;
        
        if (window.docx.default) {
            const docxLib = window.docx.default;
            Document = docxLib.Document;
            Packer = docxLib.Packer;
            Paragraph = docxLib.Paragraph;
            TextRun = docxLib.TextRun;
            HeadingLevel = docxLib.HeadingLevel;
            AlignmentType = docxLib.AlignmentType;
            UnderlineType = docxLib.UnderlineType;
            ImageRun = docxLib.ImageRun;
        } else {
            Document = window.docx.Document;
            Packer = window.docx.Packer;
            Paragraph = window.docx.Paragraph;
            TextRun = window.docx.TextRun;
            HeadingLevel = window.docx.HeadingLevel;
            AlignmentType = window.docx.AlignmentType;
            UnderlineType = window.docx.UnderlineType;
            ImageRun = window.docx.ImageRun;
        }
        
        if (!Document || !Packer || !Paragraph || !TextRun || !HeadingLevel) {
            throw new Error('DOCX library components not properly loaded');
        }
        
        console.log('✅ All DOCX components loaded successfully');
        
        const children = [];
        
        // Title
        const titleLevel = HeadingLevel.TITLE || HeadingLevel.HEADING_1;
        children.push(
            new Paragraph({
                text: flowchartData.title || 'Flowchart',
                heading: titleLevel,
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 }
            })
        );
        
        // Complexity
        children.push(
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
                children: [
                    new TextRun({
                        text: `Complexity Level: ${flowchartData.complexity.toUpperCase()}`,
                        bold: true,
                        size: 24
                    })
                ]
            })
        );
        
        // CAPTURE AND ADD FLOWCHART IMAGE
        if (typeof html2canvas !== 'undefined' && ImageRun) {
            try {
                showLoadingMessage('Capturing flowchart diagram...');
                
                const diagramContainer = document.getElementById('diagramContainer');
                const canvas = await html2canvas(diagramContainer, {
                    scale: 2,
                    backgroundColor: '#ffffff',
                    logging: false,
                    useCORS: true
                });
                
                // Convert canvas to blob
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
                
                // Convert blob to array buffer
                const arrayBuffer = await blob.arrayBuffer();
                
                // Add flowchart image to document
                children.push(
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: arrayBuffer,
                                transformation: {
                                    width: 600,
                                    height: Math.round((canvas.height / canvas.width) * 600)
                                }
                            })
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 200, after: 400 }
                    })
                );
                
                console.log('✅ Flowchart image added to document');
            } catch (error) {
                console.warn('Could not add flowchart image to DOCX:', error);
                // Continue without image - add mermaid code as fallback
                children.push(
                    new Paragraph({
                        text: 'Flowchart Diagram',
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 400, after: 200 }
                    })
                );
                
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '(Image capture failed - see Mermaid code below)',
                                italics: true,
                                size: 20
                            })
                        ],
                        spacing: { after: 200 }
                    })
                );
            }
        } else {
            // If html2canvas or ImageRun not available, add note
            children.push(
                new Paragraph({
                    text: 'Flowchart Diagram',
                    heading: HeadingLevel.HEADING_1,
                    spacing: { before: 400, after: 200 }
                })
            );
            
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: '(Flowchart image not available - see Mermaid code below)',
                            italics: true,
                            size: 20
                        })
                    ],
                    spacing: { after: 200 }
                })
            );
        }
        
        // Mermaid Code Section
        children.push(
            new Paragraph({
                text: 'Flowchart Diagram Code (Mermaid)',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400, after: 200 }
            })
        );
        
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: flowchartData.mermaidCode,
                        font: 'Courier New',
                        size: 20
                    })
                ],
                spacing: { after: 400 }
            })
        );
        
        // Detailed Steps Section
        children.push(
            new Paragraph({
                text: 'Detailed Step-by-Step Explanation',
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            })
        );
        
        flowchartData.steps.forEach((step, index) => {
            // Step number and title
            const underlineConfig = UnderlineType ? { type: UnderlineType.SINGLE } : {};
            children.push(
                new Paragraph({
                    spacing: { before: 300, after: 100 },
                    children: [
                        new TextRun({
                            text: `Step ${index + 1}: ${step.title}`,
                            bold: true,
                            size: 28,
                            underline: underlineConfig
                        })
                    ]
                })
            );
            
            // Step explanation
            children.push(
                new Paragraph({
                    text: step.explanation,
                    spacing: { after: 150 }
                })
            );
            
            // Sub-steps
            if (step.subSteps && step.subSteps.length > 0) {
                children.push(
                    new Paragraph({
                        spacing: { before: 100, after: 50 },
                        children: [
                            new TextRun({
                                text: 'Sub-steps:',
                                italics: true,
                                bold: true
                            })
                        ]
                    })
                );
                
                step.subSteps.forEach((subStep, subIndex) => {
                    children.push(
                        new Paragraph({
                            text: `   ${String.fromCharCode(97 + subIndex)}) ${subStep}`,
                            spacing: { after: 50 },
                            indent: { left: 720 }
                        })
                    );
                });
            }
        });
        
        // Create document
        const doc = new Document({
            sections: [{
                properties: {},
                children: children
            }]
        });
        
        console.log('📄 Document created, generating blob...');
        showLoadingMessage('Generating Word document...');
        
        // Generate and download
        const blob = await Packer.toBlob(doc);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${sanitizeFilename(flowchartData.title)}_flowchart.docx`;
        link.click();
        URL.revokeObjectURL(link.href);
        hideLoadingMessage();
        
        console.log('✅ DOCX file with flowchart image downloaded successfully!');
    } catch (error) {
        console.error('❌ DOCX export error:', error);
        console.error('Error stack:', error.stack);
        hideLoadingMessage();
        alert('Word document export failed: ' + error.message + '\n\nPlease try again or use PDF format instead.');
    }
}

function downloadAsJSON() {
    closeDownloadModal();
    
    const jsonData = JSON.stringify(flowchartData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = `${sanitizeFilename(flowchartData.title)}_flowchart.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}

function downloadAsMermaid() {
    closeDownloadModal();
    
    const mermaidCode = flowchartData.mermaidCode;
    const blob = new Blob([mermaidCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = `${sanitizeFilename(flowchartData.title)}_mermaid.txt`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}

// Helper functions
function sanitizeFilename(filename) {
    return filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

function showLoadingMessage(message) {
    // Remove existing loader if any
    hideLoadingMessage();
    
    const loader = document.createElement('div');
    loader.id = 'downloadLoader';
    loader.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); z-index: 10000; text-align: center;';
    loader.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 15px;">⏳</div>
        <div style="font-size: 18px; font-weight: bold; color: #333;">${message}</div>
        <div style="margin-top: 10px; font-size: 14px; color: #666;">Please wait...</div>
    `;
    document.body.appendChild(loader);
}

function hideLoadingMessage() {
    const loader = document.getElementById('downloadLoader');
    if (loader) loader.remove();
}

// Load external libraries dynamically (fallback)
function loadHtml2Canvas() {
    if (document.querySelector('script[src*="html2canvas"]')) return;
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = () => console.log('✅ html2canvas loaded');
    document.head.appendChild(script);
}

function loadJsPDF() {
    if (document.querySelector('script[src*="jspdf"]')) return;
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = () => console.log('✅ jsPDF loaded');
    document.head.appendChild(script);
}
