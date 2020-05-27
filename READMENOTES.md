# todo-redux2
basic tutorial from redux.js.org (vanilla)
https://redux.js.org/basics/basic-tutorial

## setup
```
npx create-react-app todo-redux2
npm i redux --save-dev
npm i react-redux --save-dev
npm install enzyme enzyme-adapter-react-16 enzyme-to-json --save-dev
```

## tests
npm test

# vim shortcuts
https://vim.rtorr.com/
move: eg 4 j go down 4 lines
h j k l
H M L
w e b
W E B
0 - start of line
^ - 1st non blank char
gg - 1st line of doc
G - last line
5G - line 5
{ } - jump to next/prev paragraph
move screens: down 1, up 1, up 1 screen, down 1 screen, 1/2 screen
Ctrl+e y b f d u

insert:
r - replace character
i - before cursor
I - at beginning of line
a - after cursor
A - end of line
o - append new line below current
O - apprend above current line

cut/paste:
yy - copy line (2yy for 2 lines)
y$ - copy to end of line
p - paste
dd - delete 1 line, 2dd
dw - delete word
D - delete to end of line
d$ cut to end of line
x - delete
> shift text right
< shift text left

## tutorial notes
### actions 
- for sending payloads of information from your application to your store using store.dispatch 
- plain javascript
- must have a type property


## further reading
for how to structure actions
https://github.com/redux-utilities/flux-standard-action
flux - application architecture for building user interfaces
http://facebook.github.io/flux/

