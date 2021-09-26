
class Calculation:

    def add(x:int, y:int)->int:
        return x+y

    def mul(x:int, y:int)->int:
        return x*y

    def sub(x:int, y:int)->int:
        return x-y

    def min(x:int, y:int)->int:
        return x if x <= y else y

    def max(x:int, y:int)->int:
        return x if x >= y else y

    def div(x:int, y:int)->int:
        return int(x/y)

    def mod(x:int, y:int)->int:
        return x % y

    def gcd(x:int, y:int)->int:
        def aux(x, y):
            if y == 0:
                return x
            else:
                return aux(y, x % y)

        return aux(x, y)


