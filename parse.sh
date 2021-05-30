echo [
find . -type f -name '*.adoc' | while read i; do
    # echo $i
    pmodel $i
    echo ,
done
echo {}
echo ]