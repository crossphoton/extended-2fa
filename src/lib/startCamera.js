export default async function startCamera(player) {
  // var handleSuccess = function (stream) {
  //   player.srcObject = stream;
  // };

  const a = navigator.mediaDevices.enumerateDevices().then((devices) => {
    devices = devices.filter((d) => d.kind === "videoinput");
    let advanceFilter = devices.filter((d) => String(d.label).match(/back/g));
    if (advanceFilter.length) devices = advanceFilter;

    return navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: devices[0].deviceId,
      },
    });
  });

  return a;
}
