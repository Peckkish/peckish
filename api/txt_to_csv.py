#convert text file to csv

import csv

def write_to_csv(product_details):
    with open("product_details.txt", 'r') as file:
        product_details = [line.strip() for line in file.readlines()]
        product_details = [eval(line) for line in product_details]

        
    with open('woolworths_specials.csv', 'w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=['name', 'price', 'link'])
        writer.writeheader()
        writer.writerows(product_details)


write_to_csv('product_details.txt')
