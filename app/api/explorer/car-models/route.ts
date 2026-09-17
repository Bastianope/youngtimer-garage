import { NextRequest, NextResponse } from 'next/server'
import { searchCarModelsForEventForm } from '@/lib/queries/events'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') ?? ''
  const results = await searchCarModelsForEventForm(query)
  return NextResponse.json(results)
}
