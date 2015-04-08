# To run this command you need to be in a tmux session

tmux split-window -v "make test-unit-watch"
tmux select-pane -U
tmux split-window -h "grunt server"
tmux resize-pane -t 1 -y 5
grunt