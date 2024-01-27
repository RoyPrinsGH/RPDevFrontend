cd "$(dirname "$0")"

rm -rf ../containerenv
mkdir ../containerenv

cp -r ../../../../../rpdev-frontend/* ../containerenv/ --exclude=node_modules --exclude=dist
cp ../nginx.conf ../containerenv/
cp ../certificates/* ../containerenv/

docker build -t rpdev-frontend ../containerenv -f ../dockerfile

rm -rf ../containerenv
