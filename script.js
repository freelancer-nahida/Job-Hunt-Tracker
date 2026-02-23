// 1. Initial Data
let jobs = [
    { id: 1, company: "Mobile First Corp", pos: "React Native Developer", loc: "Remote", type: "Full-time", sal: "$130k - $175k", desc: "Build cross-platform mobile applications using React Native.", status: "none" },
    { id: 2, company: "WebFlow Agency", pos: "Web Designer", loc: "LA, CA", type: "Part-time", sal: "$80k - $120k", desc: "Create stunning web experiences for high-profile clients.", status: "none" },
    { id: 3, company: "DataViz Solutions", pos: "Data Specialist", loc: "Boston, MA", type: "Full-time", sal: "$125k - $165k", desc: "Transform complex data into compelling visualizations.", status: "none" },
    { id: 4, company: "CloudFirst Inc", pos: "Backend Developer", loc: "Seattle, WA", type: "Full-time", sal: "$140k - $190k", desc: "Design and maintain scalable backend systems using Python.", status: "none" },
    { id: 5, company: "Innovation Labs", pos: "UI/UX Engineer", loc: "Austin, TX", type: "Full-time", sal: "$110k - $150k", desc: "Prototype and design user interfaces for next-gen apps.", status: "none" },
    { id: 6, company: "Cyber Shield", pos: "Security Analyst", loc: "Remote", type: "Contract", sal: "$100k - $140k", desc: "Protect infrastructure from digital threats and vulnerabilities.", status: "none" },
    { id: 7, company: "GreenTech", pos: "Frontend Dev", loc: "Denver, CO", type: "Full-time", sal: "$115k - $155k", desc: "Build sustainable tech solutions with modern JS frameworks.", status: "none" },
    { id: 8, company: "AI Dynamics", pos: "ML Engineer", loc: "San Francisco", type: "Full-time", sal: "$180k - $220k", desc: "Develop and deploy machine learning models at scale.", status: "none" }
];

let currentTab = 'all';

// 2. Core Functions
function render() {
    const container = document.getElementById('job-container');
    const emptyState = document.getElementById('empty-state');
    
    // Filter jobs based on tab
    const filteredJobs = jobs.filter(job => {
        if (currentTab === 'all') return true;
        return job.status === currentTab;
    });

    container.innerHTML = '';
    
    if (filteredJobs.length === 0) {
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
    } else {
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');
        
        filteredJobs.forEach(job => {
            const card = document.createElement('div');
            card.className = "bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative";
            card.innerHTML = `
                <button onclick="deleteJob(${job.id})" class="absolute top-4 right-4 text-gray-300 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
                <h3 class="font-bold text-blue-900">${job.company}</h3>
                <h4 class="text-xl font-semibold mb-2">${job.pos}</h4>
                <p class="text-sm text-gray-500 mb-2">${job.loc} • ${job.type} • ${job.sal}</p>
                <div class="badge badge-outline mb-4 uppercase text-xs font-bold ${job.status !== 'none' ? 'badge-primary' : ''}">
                    ${job.status === 'none' ? 'Not Applied' : job.status}
                </div>
                <p class="text-gray-600 mb-6">${job.desc}</p>
                <div class="flex gap-3">
                    <button onclick="updateStatus(${job.id}, 'interview')" class="btn btn-sm ${job.status === 'interview' ? 'btn-success text-white' : 'btn-outline btn-success'}">Interview</button>
                    <button onclick="updateStatus(${job.id}, 'rejected')" class="btn btn-sm ${job.status === 'rejected' ? 'btn-error text-white' : 'btn-outline btn-error'}">Rejected</button>
                </div>
            `;
            container.appendChild(card);
        });
    }
    updateDashboard();
}

function updateDashboard() {
    const total = jobs.length;
    const interview = jobs.filter(j => j.status === 'interview').length;
    const rejected = jobs.filter(j => j.status === 'rejected').length;

    document.getElementById('total-count').innerText = total;
    document.getElementById('interview-count').innerText = interview;
    document.getElementById('rejected-count').innerText = rejected;

    // Update section count based on current tab
    const currentCount = jobs.filter(j => currentTab === 'all' ? true : j.status === currentTab).length;
    document.getElementById('section-count').innerText = currentCount;
}

function switchTab(tab) {
    currentTab = tab;
    // UI Tab toggle
    ['all', 'interview', 'rejected'].forEach(t => {
        document.getElementById(`tab-${t}`).classList.remove('tab-active');
    });
    document.getElementById(`tab-${tab}`).classList.add('tab-active');
    render();
}

function updateStatus(id, newStatus) {
    const jobIndex = jobs.findIndex(j => j.id === id);
    // Toggle logic: If clicking the same status, revert to none. Else, set new.
    jobs[jobIndex].status = jobs[jobIndex].status === newStatus ? 'none' : newStatus;
    render();
}

function deleteJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    render();
}

// Initial Run
render();