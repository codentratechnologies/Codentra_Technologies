from PIL import Image

def generate_from_mask(mask_path, output_path):
    mask_img = Image.open(mask_path).convert("L") # Grayscale
    width, height = mask_img.size
    
    # Create new RGBA image
    # Brand Cyan: #00E5FF -> (0, 229, 255)
    brand_color = (0, 229, 255)
    
    new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    
    mask_data = mask_img.getdata()
    new_data = []
    
    for pixel in mask_data:
        if pixel > 128: # If it's part of the logo in the mask
            # Smooth the edges by using the mask value as alpha
            new_data.append((brand_color[0], brand_color[1], brand_color[2], pixel))
        else:
            new_data.append((0, 0, 0, 0))
            
    new_img.putdata(new_data)
    
    # Crop to content
    bbox = new_img.getbbox()
    if bbox:
        new_img = new_img.crop(bbox)
        
    new_img.save(output_path, "PNG")
    print("Mask-based favicon generated successfully.")

if __name__ == "__main__":
    generate_from_mask("C:/Users/Admin/.gemini/antigravity/brain/8643731b-4e3a-4647-bbbf-ac303a30d7dc/codentra_logo_mask_1778485872045.png", "public/favicon-final.png")
