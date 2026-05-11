from PIL import Image
import collections

def analyze_and_clean(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    # Analyze common colors (to find background)
    counts = collections.Counter(datas)
    # The most common color is likely the background
    most_common = counts.most_common(10)
    print(f"Top 10 colors: {most_common}")
    
    new_data = []
    for item in datas:
        # If it's grey/white (R, G, B values are close to each other)
        # OR if it's very light
        # OR if it's the most common color (likely background)
        r, g, b, a = item
        
        # Heuristic: Logo is primarily Cyan/Blue.
        # Cyan has high G and B, relatively low R.
        # If R, G, B are all very close, it's a shade of grey/white.
        is_grey = abs(r - g) < 20 and abs(g - b) < 20 and abs(r - b) < 20
        is_light = r > 150 and g > 150 and b > 150
        
        if is_grey or is_light:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    analyze_and_clean("public/favicon.png", "public/favicon.png")
