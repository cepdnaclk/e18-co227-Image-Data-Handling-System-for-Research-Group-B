from dom import DOM
import sys
import json
import cv2

imagepath = sys.argv[1]
imgPath1 = "./images/image1.jpg"
imgPath2 = "./images/image2.webp"
imgPath3 = "./images/image3.jpg"

iqa = DOM()

score = iqa.get_sharpness(imagepath)
output = score

print(json.dumps(output))

sys.stdout.flush()

