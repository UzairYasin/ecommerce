import { db, users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { generateVerificationToken } from '@/lib/tokens';

export async function GET() {

    const user = await db.select().from(users).orderBy(users.id);

    return NextResponse.json(user);
}

export async function POST(request: Request) {

    try {
        const body = await request.json();

        // Validate the body
        if (!body.name || !body.email || !body.password) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
        }

        const isUser = await db.select().from(users).where(eq(users.email, body.email)).limit(1)
        const user = isUser[0];

        if (user) {
            if (user.isVerified) {
                return NextResponse.json({ message: "Email already exists." }, { status: 400 })
            }
            else{
                const verification = await generateVerificationToken(user.email!)
                return NextResponse.json({ message: "Token generated." }, { status: 200 })
            }            
        }

        console.log(isUser)

        // Insert into the database
        await db.insert(users).values({
            name: body.name,
            email: body.email,
            password: body.password 
        });

        return NextResponse.json({ message: 'User created' });
    } catch (error) {
        console.error('Error creating user:', error); // Log the error for debugging
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {

    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
        return alert("missing fields");
    }

    await db.update(users).set(body).where(eq(users.email, email));

    return NextResponse.json("user updated");
}

export async function DELETE(request: Request) {

    const body = await request.json();
    const user = await db.delete(users).where(eq(users.id, body.id));

    return NextResponse.json("user deleted");
}
