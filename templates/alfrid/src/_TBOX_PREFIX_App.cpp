#include "cinder/app/App.h"
#include "cinder/app/RendererGl.h"
#include "cinder/gl/gl.h"
#include "cinder/Camera.h"
#include "cinder/CameraUi.h"
#include "BatchHelpers.h"

using namespace ci;
using namespace ci::app;
using namespace std;
using namespace alfrid;

const int WINDOW_WIDTH = 1280;
const int WINDOW_HEIGHT = 720;

class _TBOX_PREFIX_App : public App {
public:
	void setup() override;
	void keyDown( KeyEvent event ) override;
	void update() override;
	void draw() override;

private:
	// camera
	CameraPersp			mCamera;
	CameraUi			mCamUi;

	// helpers
	BatchAxisRef		bAxis;
	BatchGridDotsRef	bDots;
};

void _TBOX_PREFIX_App::setup()
{
    setWindowSize(WINDOW_WIDTH, WINDOW_HEIGHT);
	auto display = Display::getMainDisplay();
	setWindowPos( (display->getWidth() - WINDOW_WIDTH) * 0.5, (display->getHeight() - WINDOW_HEIGHT) * 0.5);
	setFrameRate(60.0f);

	// camera
	mCamera = CameraPersp(getWindowWidth(), getWindowHeight(), 75.0f, 0.1f, 10.0f);
	mCamera.lookAt(vec3(-2, 2, 5), vec3(0));
	mCamUi = CameraUi(&mCamera, getWindow());

	// helpers
	bAxis = BatchAxis::create();
	bDots = BatchGridDots::create();
}

void _TBOX_PREFIX_App::keyDown( KeyEvent event )
{
	if (event.getCode() == 27) {
		quit();
	}

	if (event.getChar() == 'f') {
		setFullScreen(!isFullScreen());
	}
}

void _TBOX_PREFIX_App::update()
{

}

void _TBOX_PREFIX_App::draw()
{
	gl::clear();

    gl::setMatrices(mCamera);
	bAxis->draw();
	bDots->draw();
}

CINDER_APP( _TBOX_PREFIX_App, RendererGl )