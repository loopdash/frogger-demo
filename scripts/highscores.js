MyGame.screens['high-scores'] = (function(game) {
    'use strict';
    
    function initialize() {
        document.getElementById('id-high-scores-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });
    }
    
    function run() {
        // Fetch updated high scores from local storage each time run() is called
        let highScoresScr = getStoredHighScores();
        let sortable = [];
        let score = null; // Initialize score as null
        
        if (highScoresScr && Object.keys(highScoresScr).length > 0) {
            // Add high scores to sortable array
            for (let key in highScoresScr) {
                sortable.push([key, highScoresScr[key]]);
            }
            sortable.sort((a, b) => b[1] - a[1]);

            // Set the highest score
            if (sortable.length > 0) {
                score = sortable[0][1];
            }
        }

        console.log(score)
        // Update the highscores list display
        let list = document.getElementById('scores');
        const gameLink = 'https://loopdash.github.io/frogger-demo/';

        // Clear previous list items
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        for (let i = 0; i < 5; i++) { // Display top 5 scores
            let newScore = document.createElement("li");
            if (i < sortable.length) {
                newScore.innerText = `${i + 1}. ${('0000' + sortable[i][1]).slice(-5)}`;
            } else {
                document.getElementById('high-score-header').innerHTML = 'Share'
            }
            list.appendChild(newScore);
        }

        // Set share messages based on score
        let tweetText, fbText;
        if (score) {
            tweetText = `I just scored ${score} on Obstruction Junction! Dodge the MAGA extremists for yourself with @Courage4America’s new game and then tell Congress to certify the election results. #EveryVoteCounts`;
            fbText = `I just scored ${score} on Obstruction Junction! Dodge the MAGA extremists for yourself with @CourageForAmerica’s new game and then tell Congress to certify the election results. #EveryVoteCounts`;
        } else {
            tweetText = `Play Obstruction Junction! Dodge the MAGA extremists for yourself with @Courage4America’s new game and then tell Congress to certify the election results. #EveryVoteCounts`;
            fbText = `Play Obstruction Junction! Dodge the MAGA extremists for yourself with @CourageForAmerica’s new game and then tell Congress to certify the election results. #EveryVoteCounts`;
        }

        // Twitter share link
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(gameLink)}`;
        document.getElementById('twitter-share').addEventListener('click', () => {
            window.open(twitterUrl, '_blank');
        });

        // Facebook share link
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(gameLink)}&quote=${encodeURIComponent(fbText)}`;
        
        document.getElementById('facebook-share').addEventListener('click', () => {
            // Copy text to clipboard
            navigator.clipboard.writeText(fbText).then(() => {
                document.getElementById('facebook-share').innerHTML = 'Paste in Post!';
                setTimeout(() => {
                    window.open(facebookUrl, '_blank');
                }, 500);
            }).catch(err => {
                console.error("Failed to copy text to clipboard", err);
                alert("Couldn't copy to clipboard. Please copy manually.");
            });
        });
    }
    
    return {
        initialize: initialize,
        run: run
    };
}(MyGame.game));
