UOSB Release APK

sudo keytool -genkey -v -keystore uosbrelease.keystore -alias uosbrelease -keyalg RSA -keysize 2048 -validity 10000

Pass : 123456
First Last Name : emre yurtseven
organization unit : development
organization development : development
city : istanbul
state: beşiktaş
two letter county : tr

sudo jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore uosbrelease.keystore android-release-unsigned.apk uosbrelease

sudo zipalign -v 4 android-release-unsigned.apk UOSB.apk