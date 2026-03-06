// 矿业集团企业网站 - 主要脚本

document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initScrollEffects();
  initCharts();
  initWeb3Features();
});

// ========================================
// Web3 功能初始化
// ========================================

function initWeb3Features() {
  // 初始化Tokenomics图表
  initTokenomicsChart();
  // NFT卡片悬停效果
  initNFTCards();
}

// Web3钱包连接
function connectWallet() {
  const btn = event.target.closest('.wallet-btn');
  
  // 模拟钱包连接
  if (window.ethereum) {
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        const address = accounts[0].substring(0, 6) + '...' + accounts[0].substring(address.length - 4);
        btn.textContent = '✓ ' + address;
        btn.style.background = 'linear-gradient(135deg, #00f5ff, #1e3a8a)';
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-wallet" style="margin-right: 8px;"></i>' + address;
        }, 500);
      })
      .catch(err => alert('钱包连接失败：' + err.message));
  } else {
    alert('请安装 MetaMask 或其他 Web3 钱包！');
    window.open('https://metamask.io/download/', '_blank');
  }
}

// Tokenomics 图表
function initTokenomicsChart() {
  const chart = document.getElementById('tokenomics-chart');
  if (!chart) return;
  
  const tokenomicsOption = {
    backgroundColor: 'transparent',
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
      backgroundColor: 'rgba(10, 15, 31, 0.9)',
      borderColor: '#00d9ff',
      textStyle: { color: '#00d9ff' }
    },
    legend: {
      orient: 'vertical',
      right: 'right',
      textStyle: { color: '#a5b4fc' },
      itemGap: 15
    },
    series: [{
      name: '代币分配',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: '#0a0f1f',
        borderWidth: 3
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: 'bold',
          color: '#00d9ff'
        }
      },
      data: [
        { value: 300, name: '团队 (20%)', itemStyle: { color: '#00d9ff' } },
        { value: 450, name: '生态基金 (30%)', itemStyle: { color: '#3b5998' } },
        { value: 375, name: '社区奖励 (25%)', itemStyle: { color: '#5eefff' } },
        { value: 225, name: '流动性 (15%)', itemStyle: { color: '#1e3a8a' } },
        { value: 150, name: '金库 (10%)', itemStyle: { color: '#00a8cc' } }
      ]
    }]
  };
  
  const echartsInstance = echarts.init(chart);
  echartsInstance.setOption(tokenomicsOption);
  window.addEventListener('resize', () => echartsInstance.resize());
}

// NFT 卡片交互效果
function initNFTCards() {
  const nftCards = document.querySelectorAll('.nft-card');
  nftCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const img = this.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1.1) rotate(2deg)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const img = this.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1) rotate(0)';
      }
    });
  });
}

// ========================================
// 导航相关函数
// ========================================

function initNavigation() {
  const navLinks = document.querySelectorAll('nav a');
  const currentLocation = location.pathname;

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentLocation.includes(href.replace('.html', '')) || 
        (href === 'index.html' && currentLocation.endsWith('/'))) {
      link.classList.add('active');
    }
  });
}

// ========================================
// 滚动效果
// ========================================

function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // 给不同元素添加延迟动画
        if (entry.target.classList.contains('card')) {
          entry.target.style.animation = 'float-up 0.8s ease-out forwards';
        } else if (entry.target.classList.contains('section')) {
          entry.target.style.animation = 'float-up 1s ease-out forwards';
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .section, .nft-card').forEach(el => {
    observer.observe(el);
  });
}

// ========================================
// ECharts 图表初始化
// ========================================

function initCharts() {
  // 股票图表
  const stockChart = document.getElementById('stock-chart');
  if (stockChart) {
    const stockOption = {
      title: {
        text: '本年股价趋势'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['股价']
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '股价',
        data: [120, 132, 101, 134, 90, 230, 210, 220, 180, 250, 260, 290],
        type: 'line',
        smooth: true,
        itemStyle: { color: '#d4af37' },
        areaStyle: { color: 'rgba(212, 175, 55, 0.2)' }
      }]
    };
    const chart = echarts.init(stockChart);
    chart.setOption(stockOption);
    window.addEventListener('resize', () => chart.resize());
  }

  // 產量分布图
  const productionChart = document.getElementById('production-chart');
  if (productionChart) {
    const productionOption = {
      title: {
        text: '矿产资源分布'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [{
        name: '产量百分比',
        data: [
          { value: 30, name: '黄金' },
          { value: 25, name: '铜矿' },
          { value: 20, name: '锂矿' },
          { value: 15, name: '锌矿' },
          { value: 10, name: '其他' }
        ],
        type: 'pie'
      }]
    };
    const chart = echarts.init(productionChart);
    chart.setOption(productionOption);
    window.addEventListener('resize', () => chart.resize());
  }

  // 全球分布地图
  const mapChart = document.getElementById('global-map');
  if (mapChart) {
    const mapOption = {
      title: {
        text: '全球矿山分布'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [{
        name: '矿山数量',
        data: [
          { name: '中国', value: 45 },
          { name: '秘鲁', value: 32 },
          { name: '澳大利亚', value: 28 },
          { name: '加拿大', value: 25 },
          { name: '智利', value: 22 }
        ],
        type: 'bar'
      }]
    };
    const chart = echarts.init(mapChart);
    chart.setOption(mapOption);
    window.addEventListener('resize', () => chart.resize());
  }
}

// ========================================
// 数据加载函数
// ========================================

function loadNewsByCategory(category) {
  fetch(`assets/data/${category}-news.json`)
    .then(response => response.json())
    .then(data => displayNews(data))
    .catch(error => console.error('Error loading news:', error));
}

function displayNews(newsArray) {
  const newsContainer = document.getElementById('news-list');
  newsContainer.innerHTML = '';
  
  newsArray.forEach(news => {
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item card';
    newsItem.innerHTML = `
      <img src="${news.image}" alt="${news.title}">
      <div class="news-content">
        <h4>${news.title}</h4>
        <p>${news.excerpt}</p>
        <small>${news.date}</small>
      </div>
    `;
    newsContainer.appendChild(newsItem);
  });
}

// ========================================
// 模式切换（深色/浅色）
// ========================================

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// 从本地存储恢复深色模式
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// ========================================
// 表单提交处理
// ========================================

function handleFormSubmit(formId, endpoint) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    fetch(endpoint, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('提交成功！');
        form.reset();
      } else {
        alert('提交失败，请重试');
      }
    })
    .catch(error => console.error('Error:', error));
  });
}

// ========================================
// 工具函数
// ========================================

function formatCurrency(value) {
  return '¥' + value.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatNumber(value) {
  return value.toLocaleString('en-US');
}

// ========================================
// Web3 钱包集成
// ========================================

// 监听钱包变化
if (window.ethereum) {
  window.ethereum.on('accountsChanged', function(accounts) {
    if (accounts.length === 0) {
      console.log('钱包已断开连接');
      updateWalletUI(null);
    } else {
      console.log('钱包已切换至:', accounts[0]);
      updateWalletUI(accounts[0]);
    }
  });

  window.ethereum.on('chainChanged', function(chainId) {
    console.log('网络已切换: ' + chainId);
    // 重新加载页面或更新状态
    window.location.reload();
  });
}

function updateWalletUI(address) {
  const walletBtn = document.querySelector('.wallet-btn');
  if (!walletBtn) return;

  if (address) {
    const shortAddress = address.substring(0, 6) + '...' + address.substring(address.length - 4);
    walletBtn.innerHTML = '<i class="fas fa-check" style="margin-right: 8px;"></i>' + shortAddress;
    walletBtn.style.background = 'linear-gradient(135deg, #00f5ff, #1e3a8a)';
    localStorage.setItem('connected-wallet', address);
  } else {
    walletBtn.innerHTML = '<i class="fas fa-wallet" style="margin-right: 8px;"></i>连接钱包';
    walletBtn.style.background = 'linear-gradient(135deg, #00d9ff, #1e3a8a)';
    localStorage.removeItem('connected-wallet');
  }
}

// 检查钱包连接状态
function checkWalletConnection() {
  if (window.ethereum) {
    window.ethereum.request({ method: 'eth_accounts' })
      .then(accounts => {
        if (accounts.length > 0) {
          updateWalletUI(accounts[0]);
        }
      });
  }
}

// 页面加载时检查钱包
checkWalletConnection();

// ========================================
// Tokenomics 数据查询
// ========================================

const tokenomicsData = {
  totalSupply: 1000000000,
  currentPrice: 0.0842,
  marketCap: 84200000,
  holders: 156482,
  circulation: 450000000,
  burned: 50000000,
  locked: 500000000
};

function updateTokenomicsMetrics() {
  const metrics = {
    circulate: (tokenomicsData.circulation / tokenomicsData.totalSupply * 100).toFixed(2),
    locked: (tokenomicsData.locked / tokenomicsData.totalSupply * 100).toFixed(2),
    burned: (tokenomicsData.burned / tokenomicsData.totalSupply * 100).toFixed(2)
  };
  return metrics;
}

// ========================================
// Roadmap 进度跟踪
// ========================================

const roadmapMilestones = {
  'Q1-2026': {
    status: 'completed',
    completion: 100,
    items: [
      'Smart Contract Deployment',
      'DEX Launch',
      'Liquidity Mining Start'
    ]
  },
  'Q2-2026': {
    status: 'in-progress',
    completion: 70,
    items: [
      'CEX Listed (In Progress)',
      'Polygon Bridge',
      'Lending Protocol'
    ]
  },
  'Q3-2026': {
    status: 'planned',
    completion: 30,
    items: [
      'NFT Marketplace',
      'Option Trading',
      'DAO Governance'
    ]
  },
  'Q4-2026': {
    status: 'planned',
    completion: 0,
    items: [
      'Multi-language Support',
      'GOLD 2.0 Mainnet',
      'Strategic Partnerships'
    ]
  }
};

function getRoadmapProgress(quarter) {
  return roadmapMilestones[quarter] || null;
}

function getAllRoadmapProgress() {
  return roadmapMilestones;
}

function updateRoadmapUI() {
  const progressCards = document.querySelectorAll('.progress-card');
  progressCards.forEach(card => {
    const quarter = card.querySelector('.progress-label').textContent;
    const milestone = getRoadmapProgress(quarter);
    
    if (milestone) {
      const progressBar = card.querySelector('.progress-bar > div');
      progressBar.style.width = milestone.completion + '%';
    }
  });
}

// ========================================
// 白皮书导航
// ========================================

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // 更新TOC活跃状态
    document.querySelectorAll('.toc-container a').forEach(link => {
      link.style.color = '#a5b4fc';
      link.style.borderLeftColor = 'transparent';
    });
    
    const activeLink = document.querySelector(`.toc-container a[href="#${sectionId}"]`);
    if (activeLink) {
      activeLink.style.color = '#00d9ff';
      activeLink.style.borderLeftColor = '#00d9ff';
    }
  }
}

// ========================================
// PDF 下载功能
// ========================================

function downloadPDF(filename = 'GOLD-Whitepaper-zh.pdf') {
  // 实际实现需要后端支持
  const pdfUrl = '/assets/documents/' + filename;
  
  // 创建隐藏的下载链接
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ========================================
// 分析与跟踪
// ========================================

function trackEvent(category, action, label) {
  // 集成Google Analytics或其他分析服务
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
  console.log(`事件跟踪: ${category} - ${action} - ${label}`);
}

// 跟踪钱包连接
function trackWalletConnect() {
  trackEvent('wallet', 'connect', 'user_initiated');
}

// ========================================
// 初始化支持页面
// ========================================

// 在DOM加载时执行RoadmapUI更新
document.addEventListener('DOMContentLoaded', function() {
  updateRoadmapUI();
  checkWalletConnection();
});

function formatDate(date) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

// 平滑滚动到元素
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

console.log('Mining Corporate Site - Scripts Loaded');
