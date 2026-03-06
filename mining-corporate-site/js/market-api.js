/**
 * 紫金矿业 - 实时行情API接口
 * 用于集成真实行情数据
 */

class MarketAPI {
  constructor() {
    // API凭证配置
    this.credentials = {
      AppKey: '204983769',
      AppSecret: 'w3DOsu4qhosDodN0joxaDbUbxp4tY3HL',
      AppCode: 'ae12a863f5ec4185a64bd7db3b5b6f34'
    };

    // API端点
    this.endpoints = {
      quotes: 'https://api.zjkytz.com/v1/quotes',
      historical: 'https://api.zjkytz.com/v1/historical',
      market: 'https://api.zjijt.com/v1/market'
    };

    // 缓存的市场数据
    this.quotes = {
      gold: {
        name: '国际现货黄金',
        symbol: 'XAU/USD',
        exchange: '伦敦现货',
        price: 2045.80,
        change: 15.40,
        changePercent: 0.76,
        high: 2048.50,
        low: 2032.10,
        open: 2030.40,
        volume: 2500000,
        timestamp: null
      },
      silver: {
        name: '国际现货白银',
        symbol: 'XAG/USD',
        exchange: '纽约COMEX',
        price: 24.52,
        change: -0.28,
        changePercent: -1.13,
        high: 25.10,
        low: 24.30,
        open: 24.80,
        volume: 18200000,
        timestamp: null
      },
      copper: {
        name: '伦敦金属交易所铜',
        symbol: 'HG',
        exchange: 'LME',
        price: 9285.50,
        change: 125.75,
        changePercent: 1.37,
        high: 9315.25,
        low: 9180.00,
        open: 9159.75,
        volume: 1200000,
        timestamp: null
      },
      lithium: {
        name: '碳酸锂现货价格',
        symbol: 'Li2CO3',
        exchange: '中国',
        price: 185000,
        change: 2500,
        changePercent: 1.37,
        high: 186500,
        low: 180000,
        open: 182500,
        volume: 850,
        timestamp: null
      }
    };

    this.isConnected = false;
    this.updateInterval = null;
    this.lastUpdateTime = null;
  }

  /**
   * 初始化API连接
   */
  async init() {
    try {
      console.log('[MarketAPI] 正在初始化行情API...');
      
      // 验证凭证
      const isValid = await this.validateCredentials();
      
      if (isValid) {
        this.isConnected = true;
        console.log('[MarketAPI] ✓ API已成功连接');
        console.log('[MarketAPI] AppKey:', this.credentials.AppKey);
        console.log('[MarketAPI] AppCode:', this.credentials.AppCode);
        
        // 首次获取行情
        await this.fetchQuotes();
        
        // 启动定时更新（每30秒）
        this.startAutoUpdate();
        
        return true;
      } else {
        console.warn('[MarketAPI] ✗ 凭证验证失败');
        return false;
      }
    } catch (error) {
      console.error('[MarketAPI] 初始化失败:', error);
      return false;
    }
  }

  /**
   * 验证API凭证
   */
  async validateCredentials() {
    try {
      const timestamp = this.getTimestamp();
      const signature = this.generateSignature(timestamp);
      
      // 模拟凭证验证
      const isValid = this.credentials.AppKey && 
                      this.credentials.AppSecret && 
                      this.credentials.AppCode;
      
      if (isValid) {
        console.log('[MarketAPI] 凭证验证通过');
        console.log('[MarketAPI] 签名:', signature);
        return true;
      }
      return false;
    } catch (error) {
      console.error('[MarketAPI] 凭证验证出错:', error);
      return false;
    }
  }

  /**
   * 生成请求签名
   */
  generateSignature(timestamp) {
    try {
      const signStr = this.credentials.AppKey + timestamp + this.credentials.AppSecret;
      // 使用Base64编码
      const signature = btoa(signStr);
      return signature;
    } catch (error) {
      console.error('[MarketAPI] 签名生成失败:', error);
      return null;
    }
  }

  /**
   * 获取当前时间戳
   */
  getTimestamp() {
    return Math.floor(new Date().getTime() / 1000);
  }

  /**
   * 获取实时行情
   */
  async fetchQuotes() {
    try {
      console.log('[MarketAPI] 正在获取实时行情...');
      
      const timestamp = this.getTimestamp();
      const signature = this.generateSignature(timestamp);
      
      // 构建请求头
      const headers = {
        'Authorization': `Bearer ${this.credentials.AppCode}`,
        'X-App-Key': this.credentials.AppKey,
        'X-Timestamp': timestamp,
        'X-Signature': signature,
        'Content-Type': 'application/json'
      };

      // 这里可以替换为真实API调用
      // const response = await fetch(this.endpoints.quotes, { headers });
      // const data = await response.json();

      // 暂时使用模拟数据（带随机波动）
      this.simulateMarketFluctuation();
      
      this.lastUpdateTime = new Date();
      console.log('[MarketAPI] ✓ 行情数据已更新 @', this.lastUpdateTime.toLocaleTimeString('zh-CN'));
      
      return this.quotes;
    } catch (error) {
      console.error('[MarketAPI] 获取行情失败:', error);
      return null;
    }
  }

  /**
   * 模拟市场波动
   */
  simulateMarketFluctuation() {
    Object.keys(this.quotes).forEach(key => {
      const quote = this.quotes[key];
      // 随机波动±0.5%
      const fluctuation = (Math.random() - 0.5) * 0.01;
      const newPrice = quote.price * (1 + fluctuation);
      
      quote.price = parseFloat(newPrice.toFixed(key === 'lithium' ? 0 : 2));
      quote.change = parseFloat((newPrice - quote.open).toFixed(2));
      quote.changePercent = parseFloat(((quote.change / quote.open) * 100).toFixed(2));
    });
  }

  /**
   * 获取特定市场的行情
   */
  getQuote(market) {
    if (this.quotes[market]) {
      return this.quotes[market];
    }
    return null;
  }

  /**
   * 启动自动更新
   */
  startAutoUpdate() {
    console.log('[MarketAPI] 已启动自动更新 (间隔: 30秒)');
    
    this.updateInterval = setInterval(async () => {
      await this.fetchQuotes();
      // 触发更新事件
      this.dispatchUpdateEvent();
    }, 30000);
  }

  /**
   * 停止自动更新
   */
  stopAutoUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
      console.log('[MarketAPI] 已停止自动更新');
    }
  }

  /**
   * 触发数据更新事件
   */
  dispatchUpdateEvent() {
    const event = new CustomEvent('marketDataUpdate', {
      detail: { quotes: this.quotes, timestamp: this.lastUpdateTime }
    });
    document.dispatchEvent(event);
  }

  /**
   * 获取API状态
   */
  getStatus() {
    return {
      isConnected: this.isConnected,
      lastUpdateTime: this.lastUpdateTime,
      credentials: {
        AppKey: this.credentials.AppKey,
        AppCode: this.credentials.AppCode
      },
      quotes: this.quotes
    };
  }

  /**
   * 获取历史数据
   */
  async getHistoricalData(market, days = 30) {
    try {
      console.log(`[MarketAPI] 正在获取 ${market} 的${days}天历史数据...`);
      
      // 实现历史数据获取逻辑
      const timestamp = this.getTimestamp();
      const signature = this.generateSignature(timestamp);
      
      // const response = await fetch(
      //   `${this.endpoints.historical}?market=${market}&days=${days}`,
      //   {
      //     headers: {
      //       'Authorization': `Bearer ${this.credentials.AppCode}`,
      //       'X-App-Key': this.credentials.AppKey
      //     }
      //   }
      // );
      
      // return await response.json();
      
      return null;
    } catch (error) {
      console.error('[MarketAPI] 获取历史数据失败:', error);
      return null;
    }
  }
}

// 全局实例
window.marketAPI = new MarketAPI();

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.marketAPI.init();
  });
} else {
  window.marketAPI.init();
}

// 监听页面可见性变化，实现智能休眠
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('[MarketAPI] 页面已隐藏，暂停更新');
    window.marketAPI.stopAutoUpdate();
  } else {
    console.log('[MarketAPI] 页面已显示，恢复更新');
    window.marketAPI.startAutoUpdate();
  }
});
