from dataclasses import dataclass

import pymupdf

@dataclass
class TokenPosition:
    column: int
    line: int

@dataclass
class TagBeginToken:
    name: str
    position: TokenPosition

@dataclass
class TagEndToken:
    name: str
    position: TokenPosition

Token = TagBeginToken

def parse_html(tokens: list[Token]):
    yield 1

def tokenize(data: str) -> list[Token]:
    # Add extra null termination character
    # which makes it easier to stop iteration
    new_data = data + '\0'

    column_begin_index = 0
    current_line = 1
    i = 0
    result: list[Token] = []

    while True:
        c = new_data[i]
        # If ran out of characters
        if c == '\0':
            break

        elif c == '<':
            i += 1

            # Ignore !DOCTYPE declaration
            if new_data[i] == '!':
                continue
            elif new_data[i] == '/':
                # Expect end tag
                tag_begin_index = i

                # Read all tag characters
                tag_end_index = i + 1
                
                while True:
                    new_c = new_data[tag_end_index]
                    if not (new_c.isalpha() or new_c == '-'):
                        break
                    tag_end_index += 1

                result.append(TagBeginToken(
                    name=new_data[tag_begin_index:tag_end_index]
                ))
                
                i += tag_end_index
            else:
                # Expect start tag
                tag_begin_index = i

                # Read all tag characters
                tag_end_index = i + 1
                
                while True:
                    new_c = new_data[tag_end_index]
                    if not (new_c.isalpha() or new_c == '-'):
                        break
                    tag_end_index += 1

                result.append(TagEndToken(
                    name=new_data[tag_begin_index:tag_end_index]
                ))
                
                i += tag_end_index
        elif c == '\n':
            current_line += 1
            column_begin_index = i + 1
            i += 1
        else:
            i += 1
    
    return result

# I really don't like this object-oriented inheritance approach,
# but the standard library support HTML parsing out of the box
# so I am using it.
# class MyHTMLParser(HTMLParser):
#     def __init__(self):
#         super().__init__()
#         self.parsing_description = False
#         self.parsing_description_content = False
#         self.parsing_title = False
#         self.title = ""
# 
#     def handle_endtag(self, tag):
#         if tag == "p" and self.parsing_description_content:
#             self.parsing_description_content = False
# 
#     def handle_data(self, data):
#         if self.parsing_description_content:
#             print(f"Content: \"{data}\"")
#         elif self.parsing_title:
#             self.title = data
#             self.parsing_title = False
# 
#     def handle_starttag(self, tag, attrs):
#         if tag == "div":
#             for key, value in attrs:
#                 if key == "class" and value == "description":
#                     self.parsing_description = True
#                     return
#         if tag == "h1":
#             self.parsing_title = True
#         elif tag == "p" and self.parsing_description:
#             self.parsing_description_content = True

def main():
    with open("src/index.html", "r") as f:
        index_content = f.read()

    # parser = MyHTMLParser()
    # parser.feed(index_content)

    index_content_tokens = tokenize(index_content)

    for entity in parse_html(index_content_tokens):
        print("Entity", entity)

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
        "CV",
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
    doc.save("cv.pdf")
    doc.close()

if __name__ == "__main__":
    main()