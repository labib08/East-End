interface Items {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    type: string;
  }

  const cartItems = {
    '1': 2,
    '2': 3,
  };

  const itemData: Items[] = [
    { _id: '1', name: 'Item 1', image: 'image1.jpg', price: 100, description: 'Desc 1', type: 'Type A' },
    { _id: '2', name: 'Item 2', image: 'image2.jpg', price: 50, description: 'Desc 2', type: 'Type B' },
  ];
    const getTotal = (cartItems: Record<string, number>, itemData: Items[]): number => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
        const item = itemData.find((item) => item._id === itemId);
        return item ? total + item.price * quantity : total;
    }, 0);
    };
    export const getSubtotalAndGST = (cartItems: Record<string, number>, itemData: Items[]) => {
      const total = getTotal(cartItems, itemData);
      const gst = total / 1.1 * 0.1;
      const subtotal = total - gst;
      return { subtotal, gst };
    };
  describe('getTotal function', () => {
    it('should calculate total correctly when all items are found', () => {
      const total = getTotal(cartItems, itemData);
      expect(total).toBe(2 * 100 + 3 * 50);
    });

    it('should return 0 if there are no items in cartItems', () => {
      const emptyCartItems = {};
      const total = getTotal(emptyCartItems, itemData);
      expect(total).toBe(0);
    });

    it('should return the correct total when some items are missing in itemData', () => {
      const cartItemsWithMissingData = {
        '1': 2,
        '3': 4,
      };
      const itemDataWithMissingData: Items[] = [
        { _id: '1', name: 'Item 1', image: 'image1.jpg', price: 100, description: 'Desc 1', type: 'Type A' },
      ];
      const total = getTotal(cartItemsWithMissingData, itemDataWithMissingData);
      expect(total).toBe(2 * 100);
    });

    it('should return 0 if itemData is empty', () => {
      const itemDataEmpty: Items[] = [];
      const total = getTotal(cartItems, itemDataEmpty);
      expect(total).toBe(0);
    });
  });


  describe('getSubtotalAndGST', () => {
    it('should calculate correct subtotal and GST', () => {
      const result = getSubtotalAndGST(cartItems, itemData);
      expect(result).toEqual({
        subtotal: 318.1818181818182,
        gst: 31.818181818181813,
      });
    });

    it('should handle an empty cart', () => {
        const cartItems = {};
        const itemData: Items[] = [
          { _id: '1', name: 'Item 1', image: 'image1.jpg', price: 100, description: 'Desc 1', type: 'Type A' },
          { _id: '2', name: 'Item 2', image: 'image2.jpg', price: 50, description: 'Desc 2', type: 'Type B' },
        ];

        const result = getSubtotalAndGST(cartItems, itemData);
        expect(result).toEqual({
          subtotal: 0,
          gst: 0,
        });
      });
      it('should handle an empty cart and empty itemData', () => {
        const cartItems = {};
        const itemData: Items[] = [];

        const result = getSubtotalAndGST(cartItems, itemData);
        expect(result).toEqual({
          subtotal: 0,
          gst: 0,
        });
      });
      it('should handle a cart with a single item', () => {
        const cartItems = {
          '1': 1,
        };
        const itemData: Items[] = [
          { _id: '1', name: 'Item 1', image: 'image1.jpg', price: 100, description: 'Desc 1', type: 'Type A' },
        ];

        const result = getSubtotalAndGST(cartItems, itemData);
        expect(result).toEqual({
          subtotal: 90.9090909090909,
          gst: 9.090909090909092,
        });
      });

      it('should handle a cart with items that have zero prices', () => {
        const cartItems = {
          '1': 2,
        };
        const itemData: Items[] = [
          { _id: '1', name: 'Item 1', image: 'image1.jpg', price: 0, description: 'Desc 1', type: 'Type A' },
        ];

        const result = getSubtotalAndGST(cartItems, itemData);
        expect(result).toEqual({
          subtotal: 0,
          gst: 0,
        });
      });
  });