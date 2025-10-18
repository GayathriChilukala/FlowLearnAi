// API Configuration
const GITHUB_TOKEN = "YOUR_TOKEN";
const ENDPOINT = "https://models.inference.ai.azure.com/chat/completions";
const MODEL = "gpt-4o";

// Complexity Guide Configuration
const complexityGuide = {
    'simple': {
        steps: '5-7',
        detail: 'Linear flow with main steps only. No decision points needed.',
        substeps: 'Leave subSteps as empty arrays [] for most steps'
    },
    'detailed': {
        steps: '8-12',
        detail: 'Include 1-2 decision points with clear Yes/No paths. Show important branches.',
        substeps: '2-3 sub-steps for complex main steps only (half of steps can have sub-steps)'
    },
    'advanced': {
        steps: '12-15',
        detail: 'Include 2-3 decision points, at least 1 loop for iteration, and edge case handling',
        substeps: '3-5 sub-steps for most main steps to show detailed inner workings'
    }
};
