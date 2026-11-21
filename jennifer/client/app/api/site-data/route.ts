import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('stylewithj');
    const doc = await db.collection('content').findOne({ _id: 'global_site_data' as any });

    if (!doc) {
      return NextResponse.json({ success: true, data: null, connected: true });
    }

    const { _id, ...cleanData } = doc;
    return NextResponse.json({ success: true, data: cleanData, connected: true });
  } catch (error: any) {
    let errorMsg = error?.message || 'Database unavailable';
    if (errorMsg.includes('SSL alert number 80') || errorMsg.includes('tlsv1 alert internal error')) {
      errorMsg = 'MongoDB Atlas IP Block: Please add 0.0.0.0/0 (Allow Access from Anywhere) in MongoDB Atlas -> Security -> Network Access so Vercel can connect.';
    }
    console.warn('[API /api/site-data GET] Database read error:', errorMsg);
    return NextResponse.json({ success: false, error: errorMsg, connected: false }, { status: 500 });
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
    let errorMsg = error?.message || 'Failed to save to database';
    if (errorMsg.includes('SSL alert number 80') || errorMsg.includes('tlsv1 alert internal error')) {
      errorMsg = 'MongoDB Atlas IP Block: Please add 0.0.0.0/0 (Allow Access from Anywhere) in MongoDB Atlas -> Security -> Network Access so Vercel can save changes.';
    }
    console.error('[API /api/site-data POST] Database write error:', errorMsg);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
