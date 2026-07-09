// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    console.log('RuangBelajar Admin Dashboard Page Loaded');
    
    // Hamburger Menu Logic
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = hamburgerBtn.querySelector('span');
            if (navMenu.classList.contains('active')) {
                icon.textContent = 'close';
            } else {
                icon.textContent = 'menu';
            }
        });
    }

    fetchDashboardStats();
});

let growthChartInstance = null;

function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " tahun yang lalu";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " bulan yang lalu";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " hari yang lalu";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " jam yang lalu";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " menit yang lalu";
    return Math.floor(seconds) + " detik yang lalu";
}

async function fetchDashboardStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/dashboard-stats`);
        if (!response.ok) throw new Error('Gagal mengambil data statistik');
        const data = await response.json();

        // 1. Update Stats
        document.getElementById('stat-total-users').textContent = data.totalUsers.toLocaleString('id-ID');
        document.getElementById('stat-total-donations').textContent = formatCurrency(data.totalDonations);
        document.getElementById('stat-total-courses').textContent = data.totalCourses.toLocaleString('id-ID');
        document.getElementById('stat-avg-quiz').textContent = data.avgQuizScore;

        const rawScore = parseFloat(data.avgQuizScore) || 0;
        const avgQuizProgress = document.getElementById('stat-avg-quiz-progress');
        if (avgQuizProgress) {
            avgQuizProgress.style.width = `${rawScore}%`;
            if (rawScore < 50) {
                avgQuizProgress.style.background = '#ef4444';
            } else if (rawScore < 80) {
                avgQuizProgress.style.background = '#f59e0b';
            } else {
                avgQuizProgress.style.background = '#10b981';
            }
        }

        const badgeUsers = document.getElementById('badge-users-growth');
        if(badgeUsers) {
            const val = data.usersGrowth;
            badgeUsers.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">${val >= 0 ? 'trending_up' : 'trending_down'}</span> ${Math.abs(val)}%`;
            badgeUsers.style.color = val >= 0 ? '#10b981' : '#ef4444';
            badgeUsers.style.background = val >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
        }
        
        const badgeDonations = document.getElementById('badge-donations-growth');
        if(badgeDonations) {
            const val = data.donationsGrowth;
            badgeDonations.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">${val >= 0 ? 'trending_up' : 'trending_down'}</span> ${Math.abs(val)}%`;
            badgeDonations.style.color = val >= 0 ? '#10b981' : '#ef4444';
            badgeDonations.style.background = val >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
        }

        // 2. Render Chart
        renderChart(data.monthlyGrowth, 'bulanan');

        document.getElementById('filter-monthly').addEventListener('click', (e) => {
            e.target.classList.add('active');
            document.getElementById('filter-yearly').classList.remove('active');
            renderChart(data.monthlyGrowth, 'bulanan');
        });

        document.getElementById('filter-yearly').addEventListener('click', (e) => {
            e.target.classList.add('active');
            document.getElementById('filter-monthly').classList.remove('active');
            renderChart(data.yearlyGrowth, 'tahunan');
        });

        // 3. Render Recent Donations
        const txList = document.getElementById('recent-donations-list');
        txList.innerHTML = '';
        if (data.recentDonations && data.recentDonations.length > 0) {
            data.recentDonations.forEach(tx => {
                const initial = tx.donator_name.substring(0, 2).toUpperCase();
                const timeStr = timeSince(tx.created_at);
                const amountStr = formatCurrency(tx.amount);
                
                const item = document.createElement('div');
                item.className = 'tx-item';
                item.innerHTML = `
                    <div class="tx-info">
                        <div class="tx-avatar">${initial}</div>
                        <div>
                            <h4>${tx.donator_name}</h4>
                            <p>Donasi via ${tx.donation_method}</p>
                        </div>
                    </div>
                    <div class="tx-amount">
                        <strong>${amountStr}</strong>
                        <span>${timeStr}</span>
                    </div>
                `;
                txList.appendChild(item);
            });
        } else {
            txList.innerHTML = '<div class="text-center text-slate-500 py-4">Belum ada donasi</div>';
        }

    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
    }
}

function renderChart(growthData, type) {
    const chartContainer = document.getElementById('simple-bar-chart');
    if (!chartContainer) return;
    
    chartContainer.innerHTML = '';

    let labels = [];
    let dataPoints = [];

    if (!growthData || growthData.length === 0) {
        // Fallback dummy data if db is empty just to show chart works
        if (type === 'bulanan') {
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
            dataPoints = [12, 19, 3, 5, 2, 3];
        } else {
            labels = ['2022', '2023', '2024', '2025', '2026'];
            dataPoints = [150, 200, 350, 500, 800];
        }
    } else {
        labels = growthData.map(d => d.label);
        dataPoints = growthData.map(d => d.count);
    }

    const maxVal = Math.max(...dataPoints, 1);
    const pointCount = dataPoints.length;
    
    // Spacing percentages for X axis (e.g. if 6 points, spacing is 100/5 = 20%)
    const spacing = pointCount > 1 ? 100 / (pointCount - 1) : 100;

    // Create SVG container
    const svgContainer = document.createElement('div');
    svgContainer.style.position = 'relative';
    svgContainer.style.width = '100%';
    svgContainer.style.height = '180px';
    
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.overflow = 'visible';
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');

    // Generate path points
    let polylinePoints = '';
    const pointsData = dataPoints.map((val, i) => {
        const x = i * spacing;
        const y = 100 - ((val / maxVal) * 80); // 80% to leave room on top
        polylinePoints += `${x},${y} `;
        return { x, y, val, label: labels[i] };
    });

    // Draw line
    const polyline = document.createElementNS(svgNS, 'polyline');
    polyline.setAttribute('points', polylinePoints.trim());
    polyline.setAttribute('fill', 'none');
    polyline.setAttribute('stroke', '#2563eb');
    polyline.setAttribute('stroke-width', '2');
    polyline.setAttribute('vector-effect', 'non-scaling-stroke');
    svg.appendChild(polyline);
    
    // Gradient fill under the line
    const polygon = document.createElementNS(svgNS, 'polygon');
    const firstPoint = pointsData[0];
    const lastPoint = pointsData[pointsData.length - 1];
    polygon.setAttribute('points', `${firstPoint.x},100 ${polylinePoints.trim()} ${lastPoint.x},100`);
    polygon.setAttribute('fill', 'url(#lineGradient)');
    
    const defs = document.createElementNS(svgNS, 'defs');
    const linearGradient = document.createElementNS(svgNS, 'linearGradient');
    linearGradient.setAttribute('id', 'lineGradient');
    linearGradient.setAttribute('x1', '0%');
    linearGradient.setAttribute('y1', '0%');
    linearGradient.setAttribute('x2', '0%');
    linearGradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS(svgNS, 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', 'rgba(37, 99, 235, 0.4)');
    
    const stop2 = document.createElementNS(svgNS, 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', 'rgba(37, 99, 235, 0)');
    
    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);
    defs.appendChild(linearGradient);
    svg.appendChild(defs);
    svg.appendChild(polygon);

    // Overlay div for circles and labels (to prevent stretching)
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';

    const xLabelsContainer = document.createElement('div');
    xLabelsContainer.style.display = 'flex';
    xLabelsContainer.style.justifyContent = 'space-between';
    xLabelsContainer.style.marginTop = '15px';
    xLabelsContainer.style.width = '100%';
    xLabelsContainer.style.padding = '0 5px';

    pointsData.forEach(p => {
        // Point Circle
        const circle = document.createElement('div');
        circle.style.position = 'absolute';
        circle.style.left = `${p.x}%`;
        circle.style.top = `${p.y}%`;
        circle.style.width = '12px';
        circle.style.height = '12px';
        circle.style.backgroundColor = '#fff';
        circle.style.border = '2px solid #2563eb';
        circle.style.borderRadius = '50%';
        circle.style.transform = 'translate(-50%, -50%)';
        circle.style.zIndex = '10';
        circle.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        circle.title = `${p.label}: ${p.val} Pendaftar`;

        // Value Label above point
        const valLabel = document.createElement('div');
        valLabel.textContent = p.val;
        valLabel.style.position = 'absolute';
        valLabel.style.left = `${p.x}%`;
        valLabel.style.top = `calc(${p.y}% - 22px)`;
        valLabel.style.transform = 'translateX(-50%)';
        valLabel.style.fontSize = '12px';
        valLabel.style.fontWeight = 'bold';
        valLabel.style.color = '#0f172a';
        
        overlay.appendChild(circle);
        overlay.appendChild(valLabel);

        // X-Axis Label
        const label = document.createElement('span');
        label.textContent = p.label;
        label.style.fontSize = '12px';
        label.style.color = '#64748b';
        label.style.textAlign = 'center';
        // Center text on its position (adjusting margins isn't perfect for flex-between, so we can use absolute or relative inside flex)
        xLabelsContainer.appendChild(label);
    });

    svgContainer.appendChild(svg);
    svgContainer.appendChild(overlay);
    
    chartContainer.appendChild(svgContainer);
    chartContainer.appendChild(xLabelsContainer);
}
