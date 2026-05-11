from PIL import Image
import collections

def precise_clean(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    # Analyze common colors (to find background)
    counts = collections.Counter(datas)
    # The most common color with alpha=255 is definitely the background
    # We ignore (255, 255, 255, 0) as it's already transparent
    common_solid = [c for c in counts.most_common(20) if c[0][3] == 255]
    print(f"Top solid colors: {common_solid}")
    
    # We'll remove any color that matches the top 5 solid colors
    # because the background is likely one of them (and its variations)
    bg_colors = [c[0] for c in common_solid[:5]]
    
    new_data = []
    for item in datas:
        r, g, b, a = item
        
        # Exact match or very close to common solid (background) colors
        is_bg = False
        for bg in bg_colors:
            if abs(r - bg[0]) < 5 and abs(g - bg[1]) < 5 and abs(b - bg[2]) < 5:
                is_bg = True
                break
        
        # Also remove anything that is "pure" grey/white
        is_pure_grey = abs(r - g) < 2 and abs(g - b) < 2 and abs(r - b) < 2
        
        if is_bg or is_pure_grey:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    precise_clean("public/favicon.png", "public/favicon.png")
