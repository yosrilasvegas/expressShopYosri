const { Cart } = require('../../src/cart/Cart');

describe('Cart', () => {
  let cart;

  //  s'exécute avant CHAQUE test : chaque test repart d'un panier neuf.
  beforeEach(() => {
    cart = new Cart();
  });

  // T1
  test('ajout', () => {
    cart.addItem({ id: 1, name: 'Souris sans fil', price: 24.9, quantity: 1 });
    expect(cart.getItems().length).toBe(1);
  });

  // T2 : le test ajoute lui-même l'article dont il a besoin
  test('total', () => {
    cart.addItem({ id: 1, name: 'Souris sans fil', price: 24.9, quantity: 1 });
    expect(cart.getTotal()).toBe(24.9);
  });

  // T3 : ajout de l'assertion manquante
  test('doublon', () => {
    cart.addItem({ id: 2, name: 'Câble USB', price: 19.99, quantity: 2 });
    cart.addItem({ id: 2, name: 'Câble USB', price: 19.99, quantity: 3 });
    expect(cart.getTotalQuantity()).toBe(5);
  });

  // T4 : le gros test est découpé en trois, un comportement chacun
  describe('suppression', () => {
    beforeEach(() => {
      cart.addItem({ id: 1, name: 'Souris sans fil', price: 24.9, quantity: 1 });
      cart.addItem({ id: 2, name: 'Clavier mécanique', price: 119, quantity: 1 });
    });

    test('removeItem retire l\'article demandé', () => {
      cart.removeItem(1);
      expect(cart.getItems().length).toBe(1);
      expect(cart.getTotal()).toBe(119);
    });

    test('removeItem ne change rien quand l\'id est inconnu', () => {
      cart.removeItem(99);
      expect(cart.getItems().length).toBe(2);
    });

    test(' vide le panier', () => {
      cart.clear();
      expect(cart.getItems().length).toBe(0);
    });
  });

  // T5 : liste les quantités testées
  test.each([[1], [2], [3]])('total pour une quantité de %p', (quantity) => {
    cart.addItem({ id: 3, name: 'Câble HDMI', price: 10, quantity });
    expect(cart.getTotal()).toBe(10 * quantity);
  });

  // T6 : expect à la place de console.log
  test('total d\'un clavier', () => {
    cart.addItem({ id: 4, name: 'Clavier mécanique', price: 119, quantity: 1 });
    expect(cart.getTotal()).toBe(119);
  });
});