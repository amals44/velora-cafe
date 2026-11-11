const u = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=78`

export const images = {
  latte: u('1541167760496-1628856ab772'),
  interior: u('1554118811-1e0d58224f24'),
  // Local file in /public: always loads, no remote dependency
  cafeInterior: '/cafe-interior.webp',
  beans: u('1447933601403-0c6688de566e'),
  burger: u('1568901346375-23c9450c58cd'),
  fries: u('1573080496219-bb080dd4f877'),
  dessert: u('1606313564200-e75d5e30476c'),
  shake: u('1572490122747-3968b75cc699'),
  cappuccino: u('1572442388796-11668a67e53d'),
  espresso: u('1510707577719-ae7c14805e3a'),
  cold: u('1461023058943-07fcbe16d735'),
  chicken: u('1606755962773-d324e0a13086'),
}

export const categories = ['All', 'Coffee', 'Burgers', 'Starters', 'Desserts', 'Beverages']

const item = (id, name, category, price, img, desc, featured = true) => ({ id, name, category, price, img: images[img], desc, featured })

export const menuItems = [
  item(1, 'Cappuccino', 'Coffee', 180, 'cappuccino', 'Double espresso, silky steamed milk and a crown of microfoam.'),
  item(2, 'Espresso', 'Coffee', 120, 'espresso', 'Dense, caramel-sweet and finished with a hazelnut crema.'),
  item(3, 'Cold Coffee', 'Beverages', 210, 'cold', 'Slow-chilled brew shaken with milk and a ribbon of vanilla.'),
  item(4, 'Latte', 'Coffee', 190, 'latte', 'Smooth and milky with a gentle roast and hand-poured art.'),
  item(5, 'Classic Cheeseburger', 'Burgers', 320, 'burger', 'Char-grilled patty, aged cheddar and pickles on toasted brioche.'),
  item(6, 'Chicken Burger', 'Burgers', 300, 'chicken', 'Crisp buttermilk chicken, crunchy slaw and chilli mayo.'),
  item(7, 'French Fries', 'Starters', 150, 'fries', 'Skin-on, twice-fried and dusted with sea salt and herbs.'),
  item(8, 'Chocolate Brownie', 'Desserts', 170, 'dessert', 'Warm, fudgy and served with sea-salted chocolate sauce.'),
  item(9, 'Chocolate Milkshake', 'Beverages', 230, 'shake', 'Thick, cold and finished with whipped cream.', false),
]
