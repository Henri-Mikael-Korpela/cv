import pymupdf

def main(variant: str = "cv"):
    # Create a new PDF
    doc = pymupdf.open()

    # Add a new page
    page = doc.new_page()

    # Define positions
    title_position = (72, 72)   # (x, y)
    text_position = (72, 120)

    # Insert title (larger font)
    page.insert_text(
        title_position,
        "Resume" if variant == "resume" else "CV",
        fontsize=20,
        fontname="helv",
        fill=(0, 0, 0)
    )

    # Insert body text (smaller font)
    page.insert_text(
        text_position,
        "This is the body text below the title.\nYou can add multiple lines here.",
        fontsize=12,
        fontname="helv",
        fill=(0, 0, 0)
    )

    # Save the PDF
    doc.save(f"{variant}.pdf")
    doc.close()

if __name__ == "__main__":
    main()
