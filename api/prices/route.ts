interface CoinGeckoPrice {
  usd?: number
  usd_24h_change?: number
}

interface CoinGeckoResponse {
  ethereum?: CoinGeckoPrice
  'usd-coin'?: CoinGeckoPrice
}

export async function GET() {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cusd-coin&vs_currencies=usd&include_24hr_change=true',
    { next: { revalidate: 60 } },
  )

  if (!response.ok) {
    return Response.json({ error: `Price service returned HTTP ${response.status}.` }, { status: 502 })
  }

  const data = (await response.json()) as CoinGeckoResponse
  const eth = data.ethereum?.usd
  const usdc = data['usd-coin']?.usd

  if (!Number.isFinite(eth) || !Number.isFinite(usdc) || !eth || !usdc) {
    return Response.json({ error: 'Price service returned an invalid price response.' }, { status: 502 })
  }

  return Response.json({
    prices: {
      ETH: { usd: eth, change: data.ethereum?.usd_24h_change ?? 0 },
      USDC: { usd: usdc, change: data['usd-coin']?.usd_24h_change ?? 0 },
    },
    at: Date.now(),
  })
}
