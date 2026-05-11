from PIL import Image, ImageEnhance

def brighten_and_clean(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # 1. Increase Brightness and Contrast
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(1.5) # Increase brightness by 50%
    
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.2) # Increase contrast by 20%
    
    datas = img.getdata()
    new_data = []
    for item in datas:
        r, g, b, a = item
        
        # 2. Clean dark pixels (the "dark lines")
        # If it's too dark, make it transparent
        brightness = (r + g + b) / 3
        if brightness < 40 and a > 0:
            new_data.append((0, 0, 0, 0))
        else:
            # 3. Boost the Cyan/Blue vibrancy
            # Ensure it's clearly cyan
            if b > 100 or g > 100:
                new_data.append((r, min(255, int(g * 1.2)), min(255, int(b * 1.2)), a))
            else:
                new_data.append(item)
                
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print("Brightened and cleaned successfully.")

if __name__ == "__main__":
    brighten_and_clean("public/favicon-v5.png", "public/favicon-v5.png")
