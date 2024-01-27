cd "$(dirname "$0")"

rm -rf ../containerenv
mkdir ../containerenv

cp -r ../../../../../rpdev-frontend/* ../containerenv/
cp ../nginx.conf ../containerenv/
cp ../certificates/* ../containerenv/

docker build -t rpdev-frontend ../containerenv -f ../dockerfile --progress plain --no-cache

rm -rf ../containerenv
