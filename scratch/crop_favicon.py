from PIL import Image

def crop_to_content(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # Find bounding box of non-transparent pixels
    bbox = img.getbbox()
    if bbox:
        # Crop to bounding box
        img = img.crop(bbox)
        
        # Add a tiny bit of padding (e.g. 5%) to avoid cutting off edges
        width, height = img.size
        padding = int(max(width, height) * 0.05)
        new_size = (width + 2*padding, height + 2*padding)
        new_img = Image.new("RGBA", new_size, (0, 0, 0, 0))
        new_img.paste(img, (padding, padding))
        
        # Save
        new_img.save(output_path, "PNG")
        print(f"Cropped to {new_size}")
    else:
        print("Error: No content found in image.")

if __name__ == "__main__":
    crop_to_content("public/favicon-v4.png", "public/favicon-v4.png")
