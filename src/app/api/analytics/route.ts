import { NextResponse } from 'next/server'
import sampleData from '@/lib/data/sample_data.json'

export async function GET() {
  return NextResponse.json(sampleData, { status: 200 })
}
