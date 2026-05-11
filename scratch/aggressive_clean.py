from PIL import Image
import collections

def aggressive_clean(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        r, g, b, a = item
        
        # Logo is vibrant Cyan/Blue
        # We want to keep pixels where (Blue > Red + 20) OR (Green > Red + 20)
        # And where the color isn't too light (white) or too grey.
        
        is_colored = (b > r + 10) or (g > r + 10)
        is_grey = abs(r - g) < 15 and abs(g - b) < 15 and abs(r - b) < 15
        is_light = r > 180 and g > 180 and b > 180
        
        if not is_colored or is_grey or is_light:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    aggressive_clean("public/favicon.png", "public/favicon.png")
