        var array = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];

        document.getElementById("output1").innerHTML = array.sort(function () {
            return Math.random() - 0.5;
        });

        var array2 = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

        document.getElementById("output2").innerHTML = array.sort(function () {
            return Math.random() - 4;
        });
        var array3 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];

        document.getElementById("output3").innerHTML = array.sort(function () {
            return Math.random() - 5;
        });
        var array4 = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

        document.getElementById("output4").innerHTML = array.sort(function () {
            return Math.random() - 4;
        });
        //---------------------------------------------------------------------------------//
