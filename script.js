import { MACD } from 'technicalindicators';
import moment from 'moment';
import Swal from 'sweetalert2';

const API_KEY = 'nc3cvP0d3LZzL9AIIgQQsjU6MKN8g5oanFkiAo4BdykbaOlce3HsTbWB3mPCoL8z';
const INTERVAL = '15m';
const USDT_PAIRS_ONLY = true;

let isAnalyzing = false;
let soundEnabled = false;
const notificationSound = new Audio('data:audio/wav;base64,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');

// Binance API endpoints
const BASE_URL = 'https://api.binance.com/api/v3';

// MACD Configuration
const MACD_CONFIG = {
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false
};

// DOM Elements
const startBtn = document.getElementById('startBtn');
const refreshBtn = document.getElementById('refreshBtn');
const soundToggle = document.getElementById('soundToggle');
const resultsTable = document.getElementById('resultsTable');
const loadingElement = document.getElementById('loading');

// Event Listeners
startBtn.addEventListener('click', toggleAnalysis);
refreshBtn.addEventListener('click', () => window.location.reload());
soundToggle.addEventListener('change', (e) => {
    soundEnabled = e.target.checked;
});

// Table Sorting
document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
        const sortKey = th.dataset.sort;
        sortTable(sortKey);
    });
});

async function fetchKlines(symbol, interval = INTERVAL, limit = 100) {
    try {
        const response = await fetch(`${BASE_URL}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
        const data = await response.json();
        return data.map(candle => ({
            time: candle[0],
            open: parseFloat(candle[1]),
            high: parseFloat(candle[2]),
            low: parseFloat(candle[3]),
            close: parseFloat(candle[4]),
            volume: parseFloat(candle[5])
        }));
    } catch (error) {
        console.error(`Error fetching klines for ${symbol}:`, error);
        return null;
    }
}

async function getAllSymbols() {
    try {
        const response = await fetch(`${BASE_URL}/exchangeInfo`);
        const data = await response.json();
        return data.symbols
            .filter(symbol => symbol.status === 'TRADING' && 
                            (USDT_PAIRS_ONLY ? symbol.symbol.endsWith('USDT') : true))
            .map(symbol => symbol.symbol);
    } catch (error) {
        console.error('Error fetching symbols:', error);
        return [];
    }
}

function calculateMACD(prices) {
    const macdInput = {
        values: prices,
        fastPeriod: MACD_CONFIG.fastPeriod,
        slowPeriod: MACD_CONFIG.slowPeriod,
        signalPeriod: MACD_CONFIG.signalPeriod,
        SimpleMAOscillator: MACD_CONFIG.SimpleMAOscillator,
        SimpleMASignal: MACD_CONFIG.SimpleMASignal
    };

    return MACD.calculate(macdInput);
}

function checkMACDConditions(macdData) {
    if (!macdData || macdData.length < 2) return false;

    const current = macdData[macdData.length - 1];
    const previous = macdData[macdData.length - 2];

    // Check if MACD lines are below zero
    const belowZero = current.MACD < 0 && current.signal < 0;

    // Check for bullish crossover
    const bullishCrossover = previous.MACD <= previous.signal && current.MACD > current.signal;

    return belowZero && bullishCrossover;
}

function calculateTargets(currentPrice) {
    const targets = [
        currentPrice * 1.03,  // Target 1: 3%
        currentPrice * 1.05,  // Target 2: 5%
        currentPrice * 1.08   // Target 3: 8%
    ];
    const stopLoss = currentPrice * 0.98; // Stop Loss: 2%
    return { targets, stopLoss };
}

function updateTable(data) {
    const tbody = resultsTable.querySelector('tbody');
    const row = document.createElement('tr');
    const { targets, stopLoss } = calculateTargets(data.price);

    row.innerHTML = `
        <td>${data.symbol}</td>
        <td>${data.price.toFixed(8)}</td>
        <td>${data.volume.toFixed(2)}</td>
        <td>صعودي 📈</td>
        <td>${moment(data.timestamp).format('HH:mm:ss')}</td>
        <td>
            1️⃣ ${targets[0].toFixed(8)}<br>
            2️⃣ ${targets[1].toFixed(8)}<br>
            3️⃣ ${targets[2].toFixed(8)}
        </td>
        <td>${stopLoss.toFixed(8)}</td>
    `;

    tbody.insertBefore(row, tbody.firstChild);

    if (soundEnabled) {
        notificationSound.play();
    }
}

function sortTable(key) {
    const tbody = resultsTable.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        let aValue = a.children[getColumnIndex(key)].textContent;
        let bValue = b.children[getColumnIndex(key)].textContent;

        if (key === 'price' || key === 'volume') {
            return parseFloat(bValue) - parseFloat(aValue);
        }
        return bValue.localeCompare(aValue);
    });

    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}

function getColumnIndex(key) {
    const headers = Array.from(resultsTable.querySelectorAll('th'));
    return headers.findIndex(th => th.dataset.sort === key);
}

async function analyzeSymbol(symbol) {
    try {
        const klines = await fetchKlines(symbol);
        if (!klines) return;

        const prices = klines.map(candle => candle.close);
        const macdData = calculateMACD(prices);

        if (checkMACDConditions(macdData)) {
            const lastCandle = klines[klines.length - 1];
            updateTable({
                symbol,
                price: lastCandle.close,
                volume: lastCandle.volume,
                timestamp: lastCandle.time,
            });
        }
    } catch (error) {
        console.error(`Error analyzing ${symbol}:`, error);
    }
}

async function startAnalysis() {
    loadingElement.classList.remove('hidden');
    const symbols = await getAllSymbols();
    
    while (isAnalyzing) {
        for (const symbol of symbols) {
            if (!isAnalyzing) break;
            await analyzeSymbol(symbol);
            await new Promise(resolve => setTimeout(resolve, 100)); // Rate limiting
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before next cycle
    }
    loadingElement.classList.add('hidden');
}

function toggleAnalysis() {
    isAnalyzing = !isAnalyzing;
    startBtn.textContent = isAnalyzing ? '⏹️ إيقاف التحليل' : '▶️ بدء التحليل';
    startBtn.classList.toggle('active');
    
    if (isAnalyzing) {
        startAnalysis();
    }
}