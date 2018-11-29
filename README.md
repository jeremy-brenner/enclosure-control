# enclosure-control

/etc/lightdm/lightdm.conf
xserver-command=X -s 0 -dpms -nocursor

~/.config/lxsession/LXDE-pi/autostart 
@xset s noblank
@xset s off
@xset -dpms
@chromium-browser --disable-session-crashed-bubble --kiosk http://localhost:5001


remove --disable-gpu from /etc/chromium-browser/customizations/00-rpi-vars


/etc/rc.local add:
su - pi -c 'cd /home/pi/enclosure-control/ && npm run start' &


https://discourse.octoprint.org/t/setting-up-octoprint-on-a-raspberry-pi-running-raspbian/2337