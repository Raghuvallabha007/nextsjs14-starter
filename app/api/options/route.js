import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server'

// Sample data
const dummyData = Array.from({ length: 1000 }, (_, index) => ({
  label: `Option with ${index + 1}`,
  value: index + 1,
}));

export async function GET(request) {
  const search = request.nextUrl.searchParams.get("search")
  const page = request.nextUrl.searchParams.get("page")

  const pageNumber = parseInt(page, 10) || 1;
  const pageSize = 20;

  // Filter options based on search term
  const filteredData = dummyData.filter(option =>
    option.label.toLowerCase().includes((search || '').toLowerCase())
  );

  // Calculate start and end index for pagination
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get the subset of data for the current page
  const options = filteredData.slice(startIndex, endIndex);
  const hasMore = endIndex < filteredData.length;

  // // Send the response
  // //res.json({ options, hasMore });
  return NextResponse.json({ options, hasMore }, { status: 200 })
}