// We at Content Creators know this code is useful for getting the
// extension off of the supplied filename, but we can't figure out the rest of
// the function to use it! We hope this is useful to you!


function getContentType(filename) {
  const extension = filename.match(/.*\.([^\.]*)$/)[1];
  let contentType = '';
  switch(extension) {
    case 'html':
        contentType = 'text' + '/' + extension;
        break;
    case 'css':
        contentType = 'text' + '/' + extension;
        break;
    case 'jpeg':
        contentType = 'image' + '/' + extension;
        break;
    case 'jpg':
        contentType = 'image' + '/' + 'jpeg';
        break;
    default:
        contentType = 'text' + '/' + 'plain';
        break;
}

  return contentType;
}

/*

My notes on RegExp:

/ Outside forward-slash: surrounds the regExp.
. = matches any character except for newline character
= Matches the preceding expression 0 or more times.
\ = If precedes non-special character, character turns special. If precedes special character, character turns non-special.
() = remembers what is in parentheses
[] = character set. example [a-z]
^ = in brackets, carrot negates character set
$ = character preceding is end of input.

in brackets, special characters are NOT special anymore.



[]= brackets after match() indicate what index is used to return your value, index starting at 0 of the matched character.


Example:
filename = “hello.html”
extension = “html”

*/
