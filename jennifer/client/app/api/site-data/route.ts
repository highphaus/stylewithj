import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('stylewithj');
    const doc = await db.collection('content').findOne({ _id: 'global_site_data' as any });

    if (!doc) {
      return NextResponse.json({ success: true, data: null });
    }

    const { _id, ...cleanData } = doc;
    return NextResponse.json({ success: true, data: cleanData });
  } catch (error: any) {
    console.warn('[API /api/site-data GET] Database read error, using fallback:', error?.message);
    return NextResponse.json({ success: false, error: error?.message || 'Database unavailable' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { key, data, allData } = body;

    const client = await clientPromise;
    const db = client.db('stylewithj');

    if (key && data !== undefined) {
      // Single key update (e.g. 'about', 'hero', 'looks', 'transformations')
      await db.collection('content').updateOne(
        { _id: 'global_site_data' as any },
        { 
          $set: { 
            [key]: data, 
            updatedAt: new Date() 
          } 
        },
        { upsert: true }
      );
    } else if (allData) {
      // Full site data update
      await db.collection('content').updateOne(
        { _id: 'global_site_data' as any },
        { 
          $set: { 
            ...allData, 
            updatedAt: new Date() 
          } 
        },
        { upsert: true }
      );
    }

    return NextResponse.json({ success: true, message: 'Content synced across all devices globally' });
  } catch (error: any) {
    console.error('[API /api/site-data POST] Database write error:', error?.message);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to save to database' }, { status: 500 });
  }
}
