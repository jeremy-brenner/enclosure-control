# enclosure-control

/etc/lightdm/lightdm.conf
xserver-command=X -nocursor

~/.config/lxsession/LXDE-pi/autostart 
@xset s noblank
@xset s off
@xset –dpms
@chromium-browser --disable-session-crashed-bubble --kiosk http://localhost:3000


remove --disable-gpu from /etc/chromium-browser/customizations/00-rpi-vars


/etc/rc.local add:
su - pi -c 'cd /home/pi/enclosure-control/ && npm run start' &