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
        const response = await fetch('http://localhost:3000/api/admin/dashboard-stats');
        if (!response.ok) throw new Error('Gagal mengambil data statistik');
        const data = await response.json();

        // 1. Update Stats
        document.getElementById('stat-total-users').textContent = data.totalUsers.toLocaleString('id-ID');
        document.getElementById('stat-total-donations').textContent = formatCurrency(data.totalDonations);
        document.getElementById('stat-total-courses').textContent = data.totalCourses.toLocaleString('id-ID');
        document.getElementById('stat-avg-quiz').textContent = data.avgQuizScore;

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

    const maxVal = Math.max(...dataPoints, 1); // Hindari div by zero

    dataPoints.forEach((val, i) => {
        const heightPct = (val / maxVal) * 80; // Sisakan ruang untuk label
        
        const barWrapper = document.createElement('div');
        barWrapper.style.display = 'flex';
        barWrapper.style.flexDirection = 'column';
        barWrapper.style.alignItems = 'center';
        barWrapper.style.height = '100%';
        barWrapper.style.justifyContent = 'flex-end';
        barWrapper.style.gap = '8px';
        barWrapper.style.flex = '1';

        const bar = document.createElement('div');
        bar.style.width = '30px';
        bar.style.height = `${heightPct}%`;
        bar.style.backgroundColor = '#2563eb';
        bar.style.borderRadius = '4px 4px 0 0';
        bar.style.transition = 'height 0.3s ease';
        bar.title = `${labels[i]}: ${val} Pendaftar`;

        const label = document.createElement('span');
        label.textContent = labels[i];
        label.style.fontSize = '12px';
        label.style.color = '#64748b';

        const valueLabel = document.createElement('span');
        valueLabel.textContent = val;
        valueLabel.style.fontSize = '12px';
        valueLabel.style.fontWeight = 'bold';
        valueLabel.style.color = '#0f172a';

        barWrapper.appendChild(valueLabel);
        barWrapper.appendChild(bar);
        barWrapper.appendChild(label);
        chartContainer.appendChild(barWrapper);
    });
}
