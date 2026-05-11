from PIL import Image

def extract_icon(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # The icon is on the left side.
    # We find the bounding box of the whole image.
    bbox = img.getbbox()
    if not bbox:
        print("Error: Empty image.")
        return

    # To isolate the icon from the text, we'll find where the first gap of empty columns is.
    width, height = img.size
    icon_right_edge = width
    
    # Scan columns from left to right to find the gap between icon and text
    for x in range(bbox[0], bbox[2]):
        col_empty = True
        for y in range(bbox[1], bbox[3]):
            if img.getpixel((x, y))[3] > 0:
                col_empty = False
                break
        if col_empty and x > (bbox[2] - bbox[0]) / 10: # Ensure we've passed some part of the icon
            icon_right_edge = x
            break
            
    # Crop to icon
    icon_img = img.crop((bbox[0], bbox[1], icon_right_edge, bbox[3]))
    
    # Now find the tight bounding box of just this icon part
    tight_bbox = icon_img.getbbox()
    if tight_bbox:
        icon_img = icon_img.crop(tight_bbox)
        
    # Save as favicon
    icon_img.save(output_path, "PNG")
    print(f"Original icon extracted to {output_path}")

if __name__ == "__main__":
    extract_icon("src/assets/Logo Removed Bg.png", "public/favicon-original.png")
