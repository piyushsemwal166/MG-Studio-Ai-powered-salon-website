import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const faceShape = formData.get("faceShape") as string;

    if (!faceShape) {
      return NextResponse.json(
        { message: "Face shape not provided" },
        { status: 400 }
      );
    }

    // 🎯 FACE SHAPE BASED STYLES
    const styles = {
      Round: [
        {
          id: "1",
          name: "Fade Cut",
          image: "/Fadecut.jpg",
          description: "Adds sharpness to round face",
        },
        {
          id: "2",
          name: "Undercut",
          image: "/undercut.jpg",
          description: "Creates contrast and structure",
        },
      ],

      Square: [
        {
          id: "3",
          name: "Side Part",
          image: "/undercut.jpg",
          description: "Softens strong jawline",
        },
        {
          id: "4",
          name: "Textured Crop",
          image: "/undercut.jpg",
          description: "Balances angular features",
        },
      ],

      Oval: [
        {
          id: "5",
          name: "Layered Cut",
          image: "/undercut.jpg",
          description: "Works with natural balance",
        },
        {
          id: "6",
          name: "Long Waves",
          image: "/undercut.jpg",
          description: "Enhances symmetry",
        },
      ],
    };

    const suggestions =
      styles[faceShape as keyof typeof styles] || styles["Oval"];

    return NextResponse.json({
      suggestions,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}