
export async function POST(request) {
    const data = await request.json();
    return Response.json({sucess: true});
    
}