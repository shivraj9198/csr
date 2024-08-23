def get_data_point(stock_name, bid_price, ask_price):
    """
    Returns a tuple containing stock name, bid price, ask price, and calculated price.
    
    :param stock_name: Name of the stock
    :param bid_price: Bid price of the stock
    :param ask_price: Ask price of the stock
    :return: Tuple containing stock name, bid price, ask price, and calculated price
    """
    price = (bid_price + ask_price) / 2
    return stock_name, bid_price, ask_price, price


def get_ratio(stock_a, stock_b):
    """
    Returns the ratio of the two stock prices.
    
    :param stock_a: Tuple containing stock A's information
    :param stock_b: Tuple containing stock B's information
    :return: Ratio of stock A's price to stock B's price
    """
    return stock_a[3] / stock_b[3]


def main():
    """
    Main function to process stock data and output results.
    """
    stock_a = get_data_point('Stock A', 100, 120)
    stock_b = get_data_point('Stock B', 200, 220)
    ratio = get_ratio(stock_a, stock_b)
    
    print(f"Stock A: {stock_a[0]} - Bid: {stock_a[1]}, Ask: {stock_a[2]}, Price: {stock_a[3]}")
    print(f"Stock B: {stock_b[0]} - Bid: {stock_b[1]}, Ask: {stock_b[2]}, Price: {stock_b[3]}")
    print(f"Ratio: {ratio}")


if __name__ == "__main__":
    main()

