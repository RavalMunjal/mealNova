const fs = require('fs'); 
const file = 'src/services/mockData.js'; 
let content = fs.readFileSync(file, 'utf8'); 
content = content.split('\n').map(line => { 
  if (line.includes('{ id: \'m') && !line.includes('price:')) { 
    const calMatch = line.match(/calories:\s*(\d+)/); 
    let price = 150; 
    if (calMatch) { 
      price = Math.round((parseInt(calMatch[1], 10) * 0.4 + 50) / 10) * 10; 
      if (price < 80) price = 80; 
      if (price > 350) price = 350; 
    } 
    return line.replace(/image:\s*([^,]+),\s*/, `image: $1, price: ${price}, `); 
  } 
  return line; 
}).join('\n'); 
fs.writeFileSync(file, content);
